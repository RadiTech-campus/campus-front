import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="kr">
      <Head>
        {/* <title>레디테크 | 방사선사 국가고시 인강, Radi Tech</title> */}
        <meta
          name="description"
          content="방사선사 국가고시 임상 전문 인강 사이트, 일반촬영, 투시조영, CT, 혈관조영, 치료학, 초음파, MRI, 이론 및 문제풀이 제공"
        />
        <meta
          property="og:title"
          content="레디테크 | 방사선사 국가고시 인강, Radi Tech"
        />
        <meta
          property="og:description"
          content="방사선사 국가고시 임상 전문 인강 사이트, 일반촬영, 투시조영, CT, 혈관조영, 치료학, 초음파, MRI, 이론 및 문제풀이 제공"
        />
        <meta
          name="naver-site-verification"
          content="f33d14cb87e47fd5c2ce73c6ea7aa6de45daab6a"
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
