import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";

import {
  generateTitleFromContent,
  getMDPaths,
  parseMdContent,
  prepareMdContent,
  readMDFileFromPathOrIndex,
  withIndexFile,
  withInsertedCodeFromLinks,
  withoutComments,
} from "../model/md-generate";
import Title from "../components/mdxComponents/Title";
import Paragraph from "../components/mdxComponents/Paragraph";
import CodeBlocks from "../components/mdxComponents/CodeBlocks";
import Admonition from "../components/mdxComponents/Admonition";
import DocumentationLayout from "../components/DocumentationLayout";
import {
  createLayouts,
  getDirInfoFiles,
  getFoldersInfo,
} from "../model/toc-generate";

const components = {
  h2: Title.H2,
  h3: Title.H3,
  p: Paragraph,
  code: CodeBlocks.Code,
  pre: CodeBlocks.Pre,
  tip: Admonition.Tip,
  warning: Admonition.Warning,
};

interface IFrontMatter {
  seoTitle: string;
  seoDescription: string;
}
interface IDocPage {
  mdxSource: string;
  frontMatter: IFrontMatter;
}

const DocPage: NextPage<IDocPage> = ({
  mdxSource,
  frontMatter,
}): JSX.Element => {
  return (
    <DocumentationLayout
      seo={{
        title: frontMatter.seoTitle,
        description: frontMatter.seoDescription,
      }}
    >
      {/* @ts-ignore */}
      <MDXRemote {...mdxSource} components={components} />
    </DocumentationLayout>
  );
};

export default DocPage;

export const getStaticProps: GetStaticProps = async (props) => {
  const { params } = props;
  // @ts-ignore
  const fullName = withIndexFile(params.docPath, params.isIndex);
  const source = readMDFileFromPathOrIndex(fullName);

  const { mdxSource, data, seoTitle, seoDescription } = await prepareMdContent(
    source
  );

  return {
    props: {
      mdxSource,
      frontMatter: {
        ...data,
        seoTitle,
        seoDescription,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getMDPaths();
  createLayouts();

  return {
    paths,
    fallback: false,
  };
};
