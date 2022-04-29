import path from "path";
import glob from "glob";
import fs from "fs";
import yaml from "js-yaml";

import { DOCS_PATH, getMDFiles } from "./md-generate";

export enum SectionType {
  SINGLE = "single",
  GROUP = "group",
  HIDDEN = "hidden",
  PLUGINS = "plugins",
}

type DirInfo = {
  "section-type": SectionType;
  "section-title": string;
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
  return `${c.toUpperCase()}${rest.join("")}`;
};

const getDefaultConfig = (folder: FolderInfo): DirInfo => {
  return {
    "section-type": SectionType.GROUP,
    "section-title": toCapitalCase(folder.path),
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

const matchFoldersToLayouts = (folders: FolderInfo[], layouts: LayoutsInfo) => {
  const layoutsList = Object.entries(layouts).map(([layoutKey, lt]) => ({
    layoutKey,
    ...lt,
  }));

  return folders.map((fld) => {
    const lt = layoutsList.find(({ folders }) => folders.includes(fld.path));
    if (!lt) {
      throw new Error(
        `Folder ${fld.path} isn't included to any layout. Please specify it in ${DOCS_PATH}/layouts.yaml file. If you don't want to list it in the sidebar, use "section-type: hidden" in _dirinfo.yaml`
      );
    }
    return {
      ...fld,
      layout: lt,
    };
  });
};

const getSubitems = (path, order) => {
  const items = order.map((item) => {
    if (typeof item === "object") {
      return {
        label: item.title,
        href: `/${path}${item.href}`,
      };
    }
    return {
      href: `/${path}${item}`,
      label: `get from /${path}${item}.md`,
    };
  });
  return items;
};

const generateTocItem = (fld) => {
  console.log("🚀 fld", fld);
  if (!fld) {
    return null;
  }
  const tocItem = {
    label: fld["section-title"],
    href:
      fld["section-type"] === SectionType.SINGLE ? `/${fld.path}` : undefined,
    type: fld["section-type"],
    children: fld.order?.length ? getSubitems(fld.path, fld.order) : undefined,
  };

  console.log("🚀 tocItem", tocItem);
  return tocItem;
};

const getLayoutToc = (layout: any, foldersStructure: any) => {
  const tocItems = layout.folders
    .map((fldName: any) => {
      const fld = foldersStructure.find(({ path }) => path === fldName);
      return fld;
    })
    .map(generateTocItem);

  return tocItems;
};

export const createTocs = () => {
  const infoFiles = getDirInfoFiles();
  const foldersInfo = getFoldersInfo(infoFiles);
  const mdFiles = getMDFiles();
  const folders = getAllFolders(mdFiles);

  const layouts = getLayoutsInfo();
  console.log(
    "🚀 ~ file: toc-generate.tsx ~ line 124 ~ createTocs ~ layouts",
    layouts
  );
  const foldersWithLayouts = matchFoldersToLayouts(folders, layouts);
  const foldersStructure = foldersWithLayouts.map((fld) => ({
    ...fld,
    ...(foldersInfo.find(({ folder }) => folder === fld.path)?.config ||
      getDefaultConfig(fld)),
  }));
  const docToc = getLayoutToc(layouts.documentation, foldersStructure);
  console.log("🍏🍏🍏", docToc[3]);
};
