import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

import {
  DOCS_PATH,
  getMDPaths,
  withIndexFile,
  withIndexURL,
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
    visit(tree, (node: any) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const data = node.data || (node.data = {});
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
        title: frontMatter.title ? frontMatter.title + " | Hardhat" : "Hardhat",
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const fullName = withIndexFile(params.docPath);

  let source;
  try {
    source = fs.readFileSync(fullName);
  } catch (err) {
    source = fs.readFileSync(fullName.replace(".md", "/index.md"));
  }

  const { content, data } = matter(source);

  // FIXME: `content.replace` is temporary until we support all used syntax
  const mdxSource = await serialize(content.replace(/<<<|</g, ""), {
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
    .map((path) => ({ params: { docPath: withIndexURL(path) } }));

  return {
    paths,
    fallback: false,
  };
};
