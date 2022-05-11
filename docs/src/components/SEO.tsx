import React from "react";
import Head from "next/head";

interface Props {
  seo: {
    title: string;
    description: string;
  };
}

const SEO = ({ seo }: Props) => {
  return (
    <Head>
      <title>{`${seo.title} | Ethereum development environment for professionals by Nomic Foundation`}</title>
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
