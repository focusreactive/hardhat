import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="/fonts/Chivo-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/Chivo-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/Chivo-Light.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="true"
        />
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
