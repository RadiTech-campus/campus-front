import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="kr">
      <Head>
        <title>Radi Tech | 방사선사 국가고시 인강, 레디테크</title>
        <meta
          name="description"
          content="방사선사 국가고시 임상 전문 인강 사이트, 일반촬영, 투시조영, CT, 혈관조영, 치료학, 초음파, MRI, 이론 및 문제풀이 제공"
        />
        <meta
          property="og:title"
          content="Radi Tech | 방사선사 국가고시 인강, 레디테크"
        />
        <meta
          property="og:description"
          content="방사선사 국가고시 임상 전문 인강 사이트, 일반촬영, 투시조영, CT, 혈관조영, 치료학, 초음파, MRI, 이론 및 문제풀이 제공"
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
