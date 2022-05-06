import React from "react";
import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

type Props = {};

const Searching = (props: Props) => {
  return <DocSearch appId={appId} apiKey={apiKey} indexName={indexName} />;
};

export default Searching;
