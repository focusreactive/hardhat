import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import DocumentationLayout from "../../components/DocumentationLayout";
import {
  IDocumentationSidebarStructure,
  IFooterNavigation,
} from "../../components/types";
import {
  getLayout,
  prepareMdContent,
  readMDFileFromPathOrIndex,
  withIndexFile,
} from "../../model/markdown";
import { getPluginMDSource, getPluginsPaths } from "../../model/plugins";

interface Props {
  mdxSource: string;
  // frontMatter: IFrontMatter;
  layout: IDocumentationSidebarStructure;
  prev: IFooterNavigation;
  next: IFooterNavigation;
}

const PluginPage: NextPage<Props> = ({
  mdxSource,
  layout,
  // frontMatter,
  prev,
  next,
}): JSX.Element => {
  return (
    <DocumentationLayout
      mdxSource={mdxSource}
      seo={{
        title: "frontMatter.seoTitle",
        description: "frontMatter.seoDescription",
      }}
      sidebarLayout={layout}
      footerNavigation={{ prev, next }}
    >
      {/* @ts-ignore */}
    </DocumentationLayout>
  );
};

export default PluginPage;

export const getStaticProps: GetStaticProps = async (props) => {
  const { params } = props;

  const source = getPluginMDSource(params.plugin);

  const { mdxSource, data, seoTitle, seoDescription } = await prepareMdContent(
    source
  );
  const { layout, next, prev } = getLayout("/mnt/nvme0n1p7/projects/Hardhat/react-project/docs/src/content/advanced/building-plugins.md");
  // const { layout, next, prev } = getLayout();

  return {
    props: {
      mdxSource,
      frontMatter: {
        ...data,
        seoTitle,
        seoDescription,
      },
      layout,
      next,
      prev,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPluginsPaths();

  return {
    paths,
    fallback: false,
  };
};
