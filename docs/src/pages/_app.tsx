import React from "react";
import type { AppProps } from "next/app";
import LandingLayout from "../components/LandingLayout";
import "../styles/globals.css";

import { ThemesEnum, ThemeProvider } from "../themes";
import DocumentationLayout from "../components/DocumentationLayout";

function MyApp({ Component, pageProps }: AppProps) {
  /* @ts-ignore */
  if (Component.layout !== "landing") {
    return (
      <ThemeProvider>
        <DocumentationLayout
          seo={{ title: "Overview", description: "Hardhat" }}
        >
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </DocumentationLayout>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider overrideTheme={ThemesEnum.LIGHT}>
      <LandingLayout seo={{ title: "Hardhat", description: "Hardhat" }}>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </LandingLayout>
    </ThemeProvider>
  );
}

export default MyApp;
