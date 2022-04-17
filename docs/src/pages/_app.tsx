import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import LandingLayout from "../components/LandingLayout";
import "../styles/globals.css";

import { ThemeProvider, appTheme } from "../themes";
import DocumentationLayout from "../components/DocumentationLayout";
import Title from "../components/mdxComponents/Title";
import Paragraph from "../components/mdxComponents/Paragraph";
import Code from "../components/mdxComponents/Code";

const components = {
  h2: Title.H2,
  p: Paragraph,
  code: Code,
};

//FIXME: there is a hover bug happening because of <aside /> have higher z-index rather then items under it even if aside is closed

function MyApp({ Component, pageProps }: AppProps) {
  /* @ts-ignore */
  if (Component.layout !== "landing") {
    return (
      <ThemeProvider theme={appTheme}>
        <DocumentationLayout
          seo={{ title: "Overview", description: "Hardhat" }}
        >
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </DocumentationLayout>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={appTheme}>
      <LandingLayout seo={{ title: "Hardhat", description: "Hardhat" }}>
        <Component {...pageProps} />
      </LandingLayout>
    </ThemeProvider>
  );
}

export default MyApp;
