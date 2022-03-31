import type { AppProps } from "next/app";
import LandingLayout from "../components/LandingLayout";
import "../styles/globals.css";
import { ThemeProvider, appTheme } from "../themes";
import { MDXProvider } from "@mdx-js/react";

function MyApp({ Component, pageProps }: AppProps) {
  /* @ts-ignore */
  if (Component.layout !== "landing") {
    return (
      <MDXProvider components={{}}>
        <Component {...pageProps} />
      </MDXProvider>
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
