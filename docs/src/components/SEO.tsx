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
      <title>{`${seo.title} | ${seo.description}`}</title>
      <meta name="description" content={seo.description} />
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>
  );
};

export default SEO;
