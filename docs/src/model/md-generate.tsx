import path from "path";
import glob from "glob";
import fs from "fs";

export const DOCS_PATH = path.join(process.cwd(), "src/content/");
export const newLineDividerRegEx = /\r\n|\n/;

export const getMDPaths = () =>
  glob
    .sync(`${DOCS_PATH}**/*.md`)
    .filter((pathname) => /\.mdx?$/.test(pathname))
    .map((pathname) => pathname.replace(DOCS_PATH, ""))
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((path) => ({
      params: {
        docPath: withIndexURL(path),
      },
    }));

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

export const withInsertedCodeFromLinks = (content: string) => {
  return content
    .split(newLineDividerRegEx)
    .map((line: string) => {
      if (!line.startsWith("<<<")) return line;

      const lineNumbersTuple: [number, number] | null = line.includes("{")
        ? (line
            .substring(line.indexOf("{"))
            .replace(/[{}]/g, "")
            .split("-")
            .map((lineNumberString) => Number(lineNumberString)) as [
            number,
            number
          ])
        : null;

      const filePath = lineNumbersTuple
        ? line.substring(0, line.indexOf("{"))
        : line;

      const fileContent = fs
        .readFileSync(filePath.replace("<<< @/", ""))
        .toString();

      if (!lineNumbersTuple) {
        return withCodeElementWrapper(fileContent);
      }

      const [startLineNumber, endLineNumber] = lineNumbersTuple;

      const partOfFile = fileContent
        .split(newLineDividerRegEx)
        .filter((_, index) => {
          return index >= startLineNumber - 1 && index <= endLineNumber - 1;
        })
        .join("\n");

      return withCodeElementWrapper(partOfFile);
    })
    .join("\n");
};

export const withoutComments = (content: string) => {
  return content.replace(/<!--[\s\S]*?-->/gm, "");
};

export const readMDFileFromPathOrIndex = (pathname: string) => {
  try {
    return fs.readFileSync(pathname);
  } catch (err) {
    return fs.readFileSync(pathname.replace(".md", "/index.md"));
  }
};

export const generateFrontMatterTitleFromContent = (content: string) => {
  return content.split(newLineDividerRegEx)[0].replace(/[#]*/g, "").trim();
};
