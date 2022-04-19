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
import { DOCS_PATH, getMDPaths } from "../model/md-generate";
import Title from "../components/mdxComponents/Title";
import Paragraph from "../components/mdxComponents/Paragraph";
import CodeBlocks from "../components/mdxComponents/CodeBlocks";

const components = {
  h2: Title.H2,
  p: Paragraph,
  code: CodeBlocks.Code,
  pre: CodeBlocks.Pre,
};

const DocPage: NextPage<{ source: any; frontMatter: {} }> = ({
  source,
  frontMatter,
}) => {
  return <MDXRemote {...source} components={components} />;
};

export default DocPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const postFilePath = path.join(DOCS_PATH, `${params?.docPath?.join("/")}.md`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  // FIXME: `content.replace` is temporary until we support all used syntax
  const mdxSource = await serialize(content.replace(/<<<|</g, ""), {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
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
    .map((docPath) => ({ params: { docPath: docPath.split("/") } }));

  return {
    paths,
    fallback: false,
  };
};
