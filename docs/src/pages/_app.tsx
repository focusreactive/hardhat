import { useState } from "react";
import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import LandingLayout from "../components/LandingLayout";
import "../styles/globals.css";

import { ThemesEnum, getNextTheme, ThemeProvider } from "../themes";
import DocumentationLayout from "../components/DocumentationLayout";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ThemesEnum>(ThemesEnum.LIGHT);
  /* @ts-ignore */
  if (Component.layout !== "landing") {
    return (
      <ThemeProvider
        theme={theme}
        onChangeTheme={() => setTheme(ThemesEnum[getNextTheme(theme)])}
      >
        <DocumentationLayout
          seo={{ title: "Overview", description: "Hardhat" }}
        >
          <MDXProvider components={{}}>
            <Component {...pageProps} />
          </MDXProvider>
        </DocumentationLayout>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider
      theme={ThemesEnum.LIGHT}
      onChangeTheme={() => setTheme(ThemesEnum[getNextTheme(theme)])}
    >
      <LandingLayout seo={{ title: "Hardhat", description: "Hardhat" }}>
        <Component {...pageProps} />
      </LandingLayout>
    </ThemeProvider>
  );
}

export default MyApp;
