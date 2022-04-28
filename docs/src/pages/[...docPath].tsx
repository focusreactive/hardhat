import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  generateTitleFromContent,
  getMDPaths,
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
import UnorderedList from "../components/mdxComponents/UnorderedList";
import HorizontalRule from "../components/mdxComponents/HorizontalRule";
import MDLink from "../components/mdxComponents/MDLink";
import Table from "../components/mdxComponents/Table";

const components = {
  h1: Title.H1,
  h2: Title.H2,
  h3: Title.H3,
  h4: Title.H4,
  h5: Title.H5,
  p: Paragraph,
  code: CodeBlocks.Code,
  pre: CodeBlocks.Pre,
  tip: Admonition.Tip,
  warning: Admonition.Warning,
  ul: UnorderedList,
  hr: HorizontalRule,
  a: MDLink,
  table: Table,
};

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
function createCustomNodes() {
  // @ts-ignore
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        // eslint-disable-next-line
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);
        // Create custom nodes from extended MD syntax. E.g. "tip"/"warning"
        // @ts-ignore
        data.hName = hast.tagName;
        // @ts-ignore
        data.hProperties = hast.properties;
      }
    });
  };
}

interface IFrontMatter {
  title: string;
  description: string;
  anchors?: string[];
}
interface IDocPage {
  source: string;
  frontMatter: IFrontMatter;
}

const DocPage: NextPage<IDocPage> = ({ source, frontMatter }): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const documentationView = document?.getElementById(
      "documentation-view"
    ) as Element;

    documentationView.scrollTo(0, 0);
  }, [router.asPath]);

  return (
    <DocumentationLayout
      seo={{
        title: frontMatter.title
          ? frontMatter.title.concat(" | Hardhat")
          : "Hardhat",
        description:
          frontMatter.description ||
          "Ethereum development environment for professionals by Nomic Foundation",
      }}
    >
      {/* @ts-ignore */}
      <MDXRemote {...source} components={components} />
    </DocumentationLayout>
  );
};

export default DocPage;

export const getStaticProps: GetStaticProps = async (props) => {
  const { params } = props;
  // @ts-ignore
  const fullName = withIndexFile(params.docPath, params.isIndex);
  const source = readMDFileFromPathOrIndex(fullName);
  const { content, data } = matter(source);

  const formattedContent = withoutComments(withInsertedCodeFromLinks(content));

  const mdxSource = await serialize(formattedContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkDirective, createCustomNodes],
      rehypePlugins: [],
    },
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        ...data,
        title: data.title ?? generateTitleFromContent(formattedContent),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getMDPaths();

  return {
    paths,
    fallback: false,
  };
};
