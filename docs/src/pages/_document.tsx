/* eslint-disable react/no-danger */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="/fonts/Chivo-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/Chivo-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/Chivo-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
      </Head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          const theme = localStorage.getItem('theme') || 'AUTO';
          document.body.className = theme;`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
