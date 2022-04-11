import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import LandingLayout from "../components/LandingLayout";
import "../styles/globals.css";

import { ThemesEnum, ThemeProvider } from "../themes";
import DocumentationLayout from "../components/DocumentationLayout";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ThemesEnum>(ThemesEnum.LIGHT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentTheme = localStorage.getItem("theme") as ThemesEnum;
    setTheme(currentTheme);
  }, []);

  if (!mounted) return null;

  /* @ts-ignore */
  if (Component.layout !== "landing") {
    return (
      <ThemeProvider theme={theme} onChangeTheme={setTheme}>
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
    <ThemeProvider theme={ThemesEnum.LIGHT} onChangeTheme={setTheme}>
      <LandingLayout seo={{ title: "Hardhat", description: "Hardhat" }}>
        <Component {...pageProps} />
      </LandingLayout>
    </ThemeProvider>
  );
}

export default MyApp;
