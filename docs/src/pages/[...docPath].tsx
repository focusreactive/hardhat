import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

import {
  getMDPaths,
  withIndexFile,
  withIndexURL,
  withInsertedCodeFromLinks,
  withoutComments,
} from "../model/md-generate";
import Title from "../components/mdxComponents/Title";
import Paragraph from "../components/mdxComponents/Paragraph";
import CodeBlocks from "../components/mdxComponents/CodeBlocks";
import Admonition from "../components/mdxComponents/Admonition";
import DocumentationLayout from "../components/DocumentationLayout";

const components = {
  h2: Title.H2,
  h3: Title.H3,
  p: Paragraph,
  code: CodeBlocks.Code,
  pre: CodeBlocks.Pre,
  tip: Admonition.Tip,
  warning: Admonition.Warning,
};

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
function myRemarkPlugin() {
  // @ts-ignore
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const data = node.data || {};
        const hast = h(node.name, node.attributes);
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
      <MDXRemote {...source} components={components} />;
    </DocumentationLayout>
  );
};

export default DocPage;

export const getStaticProps: GetStaticProps = async (props) => {
  const { params } = props;
  // @ts-ignore
  const fullName = withIndexFile(params.docPath, params.isIndex);

  let source;
  try {
    source = fs.readFileSync(fullName);
  } catch (err) {
    source = fs.readFileSync(fullName.replace(".md", "/index.md"));
  }

  const { content, data } = matter(source);

  const formattedContent = withoutComments(withInsertedCodeFromLinks(content));

  const mdxSource = await serialize(formattedContent, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkDirective, myRemarkPlugin],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getMDPaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((path) => ({
      params: {
        docPath: withIndexURL(path),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};
