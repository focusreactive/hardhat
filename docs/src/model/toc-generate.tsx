import glob from "glob";
import fs from "fs";
import yaml from "js-yaml";

import {
  DOCS_PATH,
  getMDFiles,
  parseMdFile,
  readMDFileFromPathOrIndex,
  TEMP_PATH,
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

const matchFoldersToLayouts = (
  folders: FolderInfo[],
  layouts: LayoutsInfo,
  foldersInfo
) => {
  const layoutsList = Object.entries(layouts).map(([layoutKey, lt]) => ({
    layoutKey,
    ...lt,
  }));

  const allFolderPaths = new Set([
    ...folders.map(({ path }) => path),
    ...foldersInfo.map(({ folder }) => folder),
  ]);

  console.log(
    "🚀 ~ file: toc-generate.tsx ~ line 121 ~ allFolderPaths",
    allFolderPaths
  );

  // @ts-ignore
  return [...allFolderPaths].map((path) => {
    const lt = layoutsList.find(({ folders }) => folders.includes(path));
    if (!lt) {
      throw new Error(
        `Folder ${path} isn't included to any layout. Please specify it in ${DOCS_PATH}/layouts.yaml file. If you don't want to list it in the sidebar, use "section-type: hidden" in _dirinfo.yaml`
      );
    }
    const fld = folders.find((f) => f.path === path);
    const files = fld?.files || null;
    return {
      path,
      files,
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
    const { source } = readMDFileFromPathOrIndex(`${DOCS_PATH}${fullName}`);

    const { tocTitle } = parseMdFile(source);

    return {
      href: `/${path}${item}`,
      label: tocTitle || item,
    };
  });
  return items;
};

type FolderType = {
  "section-title": string;
  "section-type": SectionType;
  path: string;
  order: Array<{ title: string; href: string } | string>;
};

const generateGroupSection = (folder: FolderType) => {
  const tocItem = {
    label: folder["section-title"],
    type: folder["section-type"],
    children: folder.order?.length
      ? getSubitems(folder.path, folder.order)
      : undefined,
  };

  return tocItem;
};

const generateSingleSection = (folder: FolderType) => {
  const tocItem = {
    label: folder["section-title"],
    href: `/${folder.path}`,
    type: folder["section-type"],
    children: folder.order?.length
      ? getSubitems(folder.path, folder.order)
      : undefined,
  };

  return tocItem;
};

const generateHiddenSection = () => null;

const generatePluginsSection = (folder: FolderType) => {
  const tocItem = {
    label: folder["section-title"] || toCapitalCase(folder.path),
    type: folder["section-type"],
    children: undefined,
  };

  return tocItem;
};

const sectionTypeGeneratorsMap = {
  [SectionType.GROUP]: generateGroupSection,
  [SectionType.SINGLE]: generateSingleSection,
  [SectionType.HIDDEN]: generateHiddenSection,
  [SectionType.PLUGINS]: generatePluginsSection,
};

const generateTocItem = (fld: null | FolderType) => {
  if (!fld) {
    return null;
  }
  const sectionType = fld["section-type"];
  const sectionGenerator = sectionTypeGeneratorsMap[sectionType];

  if (!sectionGenerator) {
    throw new Error(`wrong section-type - ${sectionType} (see ${fld.path})`);
  }

  return sectionGenerator(fld);
};

const getLayoutToc = (layout: any, foldersStructure: any) => {
  const tocItems = layout.folders
    .map((fldName: string) => {
      const fld = foldersStructure.find(
        ({ path }: { path: string }) => path === fldName
      );
      return fld;
    })
    .map(generateTocItem)
    .filter(Boolean);

  return tocItems;
};

export const createLayouts = () => {
  const infoFiles = getDirInfoFiles();
  const foldersInfo = getFoldersInfo(infoFiles);
  const mdFiles = getMDFiles();
  const folders = getAllFolders(mdFiles);

  const layouts = getLayoutsInfo();
  const foldersWithLayouts = matchFoldersToLayouts(
    folders,
    layouts,
    foldersInfo
  );
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

  const layoutsMap = foldersWithLayouts
    .map((folder) =>
      folder.files?.map((file) => ({
        file,
        folder: folder.path,
        layout: folder.layout.layoutKey,
      }))
    )
    .filter(Boolean)
    .flat()
    .reduce(
      (acc, obj) => ({
        ...acc,
        [obj.file]: obj,
      }),
      {}
    );

  /**
   * We generating this config once per build from `getStaticPaths`.
   * After that we writing the config to a temporary file for reusing this data from `getStaticProps` on page generations.
   * So each single page don't need to execute this function again
   */
  const sidebarConfigPath = `${TEMP_PATH}sidebarConfig.json`;
  fs.writeFileSync(
    sidebarConfigPath,
    JSON.stringify({ layoutConfigs, layoutsMap })
  );
};
