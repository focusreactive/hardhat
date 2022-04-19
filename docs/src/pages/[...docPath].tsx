import type { NextPage } from "next";
import { useRouter } from "next/router";

const DocPage: NextPage = () => {
  const router = useRouter();
  const { docPath } = router.query;
  return <h1>DocPage {docPath}</h1>;
};

export default DocPage;
