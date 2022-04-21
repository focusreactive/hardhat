import path from "path";
import glob from "glob";

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
