import path from "path";
import glob from "glob";
import fs from "fs";
import yaml from "js-yaml";

import {
  DOCS_PATH,
  getMDFiles,
  parseMdContent,
  parseMdFile,
  readMDFileFromPathOrIndex,
} from "./md-generate";

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
  const config = {
    "section-type": SectionType.GROUP,
    "section-title": toCapitalCase(folder.path),
    order: folder.files.map((fl) =>
      fl.replace(/\.mdx?$/, "").replace(new RegExp(`^${folder.path}`), "")
    ),
  };

  return config;
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

const getSubitems = (
  path: string,
  order: Array<{ title: string; href: string } | string>
) => {
  const items = order.map((item) => {
    if (typeof item === "object") {
      return {
        label: item.title,
        href: `/${path}${item.href}`,
      };
    }

    const fullName = `${path}${item}.md`;
    const source = readMDFileFromPathOrIndex(`${DOCS_PATH}${fullName}`);

    const { tocTitle } = parseMdFile(source);

    return {
      href: `/${path}${item}`,
      label: tocTitle || item,
    };
  });
  return items;
};

const generateTocItem = (
  fld: null | {
    "section-title": string;
    "section-type": SectionType;
    path: string;
    order: Array<{ title: string; href: string } | string>;
  }
) => {
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

  return tocItem;
};

const getLayoutToc = (layout: any, foldersStructure: any) => {
  const tocItems = layout.folders
    .map((fldName: string) => {
      const fld = foldersStructure.find(
        ({ path }: { path: string }) => path === fldName
      );
      if (!fld || fld["section-type"] === SectionType.HIDDEN) {
        return null;
      }
      return fld;
    })
    .filter(Boolean)
    .map(generateTocItem);

  return tocItems;
};

export const createLayouts = () => {
  const infoFiles = getDirInfoFiles();
  const foldersInfo = getFoldersInfo(infoFiles);
  const mdFiles = getMDFiles();
  const folders = getAllFolders(mdFiles);

  const layouts = getLayoutsInfo();
  const foldersWithLayouts = matchFoldersToLayouts(folders, layouts);
  const foldersStructure = foldersWithLayouts.map((fld) => ({
    ...fld,
    ...(foldersInfo.find(({ folder }) => folder === fld.path)?.config ||
      getDefaultConfig(fld)),
  }));
  const layoutConfigs = Object.entries(layouts)
    .map(([key, l]) => ({
      [key]: getLayoutToc(l, foldersStructure),
    }))
    .reduce(
      (acc, obj) => ({
        ...acc,
        ...obj,
      }),
      {}
    );

  console.log(
    "🚀 ~ file: toc-generate.tsx ~ line 196 ~ createTocs ~ docToc",
    layoutConfigs
  );
};
