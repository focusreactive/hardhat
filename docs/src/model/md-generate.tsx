import fs from "fs";
import path from "path";
import glob from "glob";

export const DOCS_PATH = path.join(process.cwd(), "src/content/");

export const getMDPaths = glob
  .sync(`${DOCS_PATH}**/*.md`)
  .filter((path) => /\.mdx?$/.test(path))
  .map((path) => path.replace(DOCS_PATH, ""));

  // TODO: update this solution to work with any number of nested levels. (withIndexURL and withIndexFile)
export const withIndexURL = (path: string): string[] => {
  const docPath = path.split("/");
  if (docPath[1] === "index") {
    return [docPath[0]];
  }
  return docPath;
};

export const withIndexFile = (docPath: string[]): string => {
  const actualPath = docPath.length > 1 ? docPath : [docPath[0], "index"];
  const mdFilePath = path.join(DOCS_PATH, `${actualPath.join("/")}.md`);
  return mdFilePath;
};
