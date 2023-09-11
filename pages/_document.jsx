import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="kr">
      <Head>
        <title>레디테크 | 방사선사 국가고시 인강, Radi Tech</title>
        <meta
          name="description"
          content="방사선사 국가고시 강의, 취업을 위한 종합 플랫폼"
        />
        <meta property="og:title" content="레디테크 캠퍼스" />
        <meta
          property="og:description"
          content="방사선사 국가고시 강의, 취업을 위한 종합 플랫폼"
        />
      </Head>
      <body>
        <Main />
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  );
}
