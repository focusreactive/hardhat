import fs from "fs";
import path from "path";
import glob from "glob";

export const DOCS_PATH = path.join(process.cwd(), "src/content/");

export const getMDPaths = glob
  .sync(`${DOCS_PATH}**/*.md`)
  .filter((path) => /\.mdx?$/.test(path))
  .map((path) => path.replace(DOCS_PATH, ""));
