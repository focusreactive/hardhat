import path from "path";
import glob from "glob";
import fs from "fs";
import yaml from "js-yaml";

import { DOCS_PATH, getMDFiles } from "./md-generate";

type DirInfo = {
  "section-type": "single" | "group";
  "section-title": string;
  layout: string;
  order: string[];
};

type LayoutsInfo = {
  [layoutKey: string]: {
    title: string;
    folders: string[];
  };
};

type FolderInfo = {
  path: string;
  files: string[];
};

const toCapitalCase = (str: string): string => {
  // @ts-ignore
  const [c, ...rest] = str;
  return `${c.toUpperCase()}${rest.join()}`;
};

const getDefaultConfig = (folder: FolderInfo): DirInfo => {
  return {
    "section-type": "group",
    "section-title": toCapitalCase(folder.path),
    layout: "default",
    order: folder.files,
  };
};

const getLayoutsInfo = (): LayoutsInfo => {
  const fullPath = `${DOCS_PATH}/layouts.yaml`;
  const yamlText = fs.readFileSync(fullPath).toString();
  const yamlData = yaml.load(yamlText) as LayoutsInfo;
  return yamlData;
};

type InfoFiles = Array<{ path: string }>;

export const getDirInfoFiles = (): InfoFiles =>
  glob
    .sync(`${DOCS_PATH}**/_dirinfo.yaml`)
    .filter((pathname) => /\.yaml$/.test(pathname))
    .map((pathname) => pathname.replace(DOCS_PATH, ""))
    .map((pathname) => ({
      path: pathname,
    }));

export const getYamlData = (relativePath: string): DirInfo => {
  const fullPath = `${DOCS_PATH}/${relativePath}`;
  const yamlText = fs.readFileSync(fullPath).toString();
  const yamlData = yaml.load(yamlText) as DirInfo;
  return yamlData;
};

export const getFoldersInfo = (infoFiles: InfoFiles) =>
  infoFiles.map(({ path }) => ({
    path,
    folder: path.replace("/_dirinfo.yaml", ""),
    config: getYamlData(path),
  }));

export const getAllFolders = (mdFiles: string[]): FolderInfo[] => {
  const filesWithPaths = mdFiles.map((fileName) => ({
    fileName,
    path: fileName.replace(/\/.*\.mdx?$/, ""),
  }));
  // @ts-ignore
  const allPaths = [...new Set(filesWithPaths.map(({ path }) => path))];
  const folders = allPaths.map((path) => ({
    path,
    files: filesWithPaths
      .filter((fl) => fl.path === path)
      .map(({ fileName }) => fileName),
  }));

  return folders;
};

export const createTocs = () => {
  const infoFiles = getDirInfoFiles();
  const foldersInfo = getFoldersInfo(infoFiles);
  const mdFiles = getMDFiles();
  const folders = getAllFolders(mdFiles);
  const foldersStructure = folders.map((fld) => ({
    ...fld,
    ...(foldersInfo.find(({ folder }) => folder === fld.path)?.config ||
      getDefaultConfig(fld)),
  }));
  const layouts = getLayoutsInfo();
  console.log("🚀 ~ file: toc-generate.tsx ~ line 102 ~ createTocs ~ layouts", layouts)
  console.log(
    "🚀 ~ file: toc-generate.tsx ~ line 60 ~ createToc ~ folders",
    foldersStructure
  );
};
