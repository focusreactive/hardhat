import React from "react";
import Head from "next/head";
import { DocSearch } from "@docsearch/react";
import "@docsearch/css";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

type Props = {};

const Searching = (props: Props) => {
  return (
    <>
      <Head>
        {/**
         * By adding this snippet to the head, we can hint the browser that the website will load data from Algolia,
         * and allows it to preconnect to the DocSearch cluster. It makes the first query faster,
         * especially on mobile.
         *
         * But we don't want to affect landing pages where we don't use searching. So we adding this only on pages
         * where we actually using this
         */}
        <link
          rel="preconnect"
          href={`https://${appId}-dsn.algolia.net`}
          crossOrigin="true"
        />
      </Head>
      <DocSearch appId={appId} apiKey={apiKey} indexName={indexName} />;
    </>
  );
};

export default Searching;
