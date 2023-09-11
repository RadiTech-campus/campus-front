import React from "react";
import Head from "next/head";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { globalStyles } from "../global";
import Layout from "../components/layout";
import { ProvideAuth } from "../hooks/useAuth";
import { ProvideIsMobile } from "../hooks/useIsMobile";

export default function IndexPage({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ProvideAuth>
        <ProvideIsMobile>
          <Hydrate state={pageProps.dehydratedState}>
            {globalStyles}
            {/* <Head>
              <title>Radi Tech Campus</title>
            </Head> */}
            <Layout>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </Layout>
          </Hydrate>
        </ProvideIsMobile>
      </ProvideAuth>
    </QueryClientProvider>
  );
}
