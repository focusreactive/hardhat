import path from "path";
import glob from "glob";
import fs from "fs";
import matter from "gray-matter";
import remarkDirective from "remark-directive";
import { serialize } from "next-mdx-remote/serialize";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

export const DOCS_PATH = path.join(process.cwd(), "src/content/");
export const newLineDividerRegEx = /\r\n|\n/;

export const withIndexURL = (pathname: string): string[] => {
  const docPath = pathname.split("/");
  if (docPath[docPath.length - 1] === "index") {
    return [...docPath.slice(0, docPath.length - 1)];
  }
  return docPath;
};

export const withIndexFile = (docPath: string[], isIndex: boolean): string => {
  const mdFilePath = path.join(
    DOCS_PATH,
    `${docPath.join("/")}${isIndex ? "/index" : ""}.md`
  );
  return mdFilePath;
};

export const withCodeElementWrapper = (content: string) =>
  `
   \`\`\`
    ${content}
    \`\`\`
  `;

export const getEntriesInfo = (
  line: string
): {
  pathname: string;
  rowsNumbers: [number, number] | null;
} => {
  const rowsNumbers: [number, number] | null = line.includes("{")
    ? (line
        .substring(line.indexOf("{"))
        .replace(/[{}]/g, "")
        .split("-")
        .map((lineNumberString) => Number(lineNumberString)) as [
        number,
        number
      ])
    : null;

  const pathname = (
    rowsNumbers ? line.substring(0, line.indexOf("{")) : line
  ).replace("<<< @/", "");

  return {
    pathname,
    rowsNumbers,
  };
};

export const getContentFromRange = (
  content: string,
  rowsNumbers: [number, number] | null
) => {
  const linesArray = content.split(newLineDividerRegEx);
  const [startLineNumber, endLineNumber] = rowsNumbers || [
    0,
    linesArray.length,
  ];

  return linesArray.slice(startLineNumber, endLineNumber).join("\n");
};

export const readFileContent = (pathname: string) => {
  try {
    return fs.readFileSync(pathname).toString();
  } catch (err) {
    throw new Error(`Cannot read file from: ${pathname}`);
  }
};

export const withInsertedCodeFromLinks = (content: string) => {
  return content
    .split(newLineDividerRegEx)
    .map((line: string) => {
      if (!line.startsWith("<<<")) return line;

      const { pathname, rowsNumbers } = getEntriesInfo(line);

      const fileContent = readFileContent(pathname);

      const contentFromRange = getContentFromRange(fileContent, rowsNumbers);
      return withCodeElementWrapper(contentFromRange);
    })
    .join("\n");
};

export const withoutComments = (content: string) => {
  return content.replace(/<!--[\s\S]*?-->/gm, "");
};

export const readMDFileFromPathOrIndex = (pathname: string): string => {
  try {
    return fs.readFileSync(pathname).toString();
  } catch (err) {
    return fs.readFileSync(pathname.replace(".md", "/index.md")).toString();
  }
};

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
function createCustomNodes() {
  // @ts-ignore
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        // eslint-disable-next-line
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);
        // Create custom nodes from extended MD syntax. E.g. "tip"/"warning"
        // @ts-ignore
        data.hName = hast.tagName;
        // @ts-ignore
        data.hProperties = hast.properties;
      }
    });
  };
}

export const generateTitleFromContent = (content: string) => {
  return content.split(newLineDividerRegEx)[0].replace(/[#]*/g, "").trim();
};

export const parseMdFile = (source: string) => {
  const { content, data } = matter(source);
  const formattedContent = withoutComments(withInsertedCodeFromLinks(content));

  const tocTitle = data.title ?? generateTitleFromContent(formattedContent);
  const seoTitle = [tocTitle, "Hardhat"].filter(Boolean).join(" | ");
  const seoDescription =
    data.title ||
    "Ethereum development environment for professionals by Nomic Foundation";

  return {
    rawContent: content,
    formattedContent,
    data,
    tocTitle,
    seoTitle,
    seoDescription,
  };
};

export const prepareMdContent = async (source: string) => {
  const { formattedContent, ...props } = parseMdFile(source);
  const mdxSource = await serialize(formattedContent, {
    mdxOptions: {
      remarkPlugins: [remarkDirective, createCustomNodes],
      rehypePlugins: [],
    },
  });

  return {
    mdxSource,
    ...props,
  };
};

export const getMDFiles = (): string[] =>
  glob
    .sync(`${DOCS_PATH}**/*.md`)
    .filter((pathname) => /\.mdx?$/.test(pathname))
    .map((pathname) => pathname.replace(DOCS_PATH, ""));

export const getMDPaths = (): Array<{ params: { docPath: string[] } }> =>
  getMDFiles()
    .map((pathname) => pathname.replace(/\.mdx?$/, ""))
    .map((pathname) => ({
      params: {
        docPath: withIndexURL(pathname),
      },
    }));
