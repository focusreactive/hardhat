import type { NextPage } from "next";

import DocumentationLayout from "../../components/DocumentationLayout";

const Plugins: NextPage = () => {
  return (
    // @ts-ignore
    <DocumentationLayout
      seo={{
        title: "Plugins",
        description: "Plugins",
      }}
      // sidebarLayout="documents"
      // footerNavigation={{ prev, next }}
    >
      <div>
        <h2>Plugins Page</h2>
        <h2 id="community-plugins">Community plugins</h2>
      </div>
      {/* @ts-ignore */}
      {/* <MDXRemote {...mdxSource} components={components} /> */}
    </DocumentationLayout>
  );
};

export default Plugins;
