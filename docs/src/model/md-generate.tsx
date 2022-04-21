import path from "path";
import glob from "glob";
import fs from "fs";

export const DOCS_PATH = path.join(process.cwd(), "src/content/");

export const getMDPaths = glob
  .sync(`${DOCS_PATH}**/*.md`)
  .filter((path) => /\.mdx?$/.test(path))
  .map((path) => path.replace(DOCS_PATH, ""));

export const withIndexURL = (path: string): string[] => {
  const docPath = path.split("/");
  if (docPath[docPath.length - 1] === "index") {
    return [...docPath.slice(0, docPath.length - 1)];
  }
  return docPath;
};

export const withIndexFile = (docPath: string[]): string => {
  const mdFilePath = path.join(DOCS_PATH, `${docPath.join("/")}.md`);
  return mdFilePath;
};

export const withCodeElementWrapper = (content: string) =>
  `
   \`\`\` 
    ${content}   
    \`\`\`
  `;

export const withInsertedCodeFromLinks = (content: string) => {
  const newLineDividerRegEx = /\r\n|\n/;
  return content
    .split(newLineDividerRegEx)
    .map((line: string) => {
      if (!line.startsWith("<<<")) return line;

      const lineNumbersTuple: [number, number] | null = line.includes("{")
        ? (line
            .substring(line.indexOf("{"))
            .replace(/[\{\}]/g, "")
            .split("-")
            .map((lineNumberString) => Number(lineNumberString)) as [
            number,
            number
          ])
        : null;

      const path = lineNumbersTuple
        ? line.substring(0, line.indexOf("{"))
        : line;

      const fileContent = fs
        .readFileSync(path.replace("<<< @/", ""))
        .toString();

      if (!lineNumbersTuple) {
        return withCodeElementWrapper(fileContent);
      }

      const [startLineNumber, endLineNumber] = lineNumbersTuple;

      const partOfFile = fileContent
        .toString()
        .split(newLineDividerRegEx)
        .filter((_, index) => {
          return (
            index >= Number(startLineNumber) - 1 &&
            index <= Number(endLineNumber) - 1
          );
        })
        .join("\n");

      return withCodeElementWrapper(partOfFile);
    })
    .join("\n");
};
