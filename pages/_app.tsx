import "../src/styles.css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import type { FC, PropsWithChildren, ReactElement, ReactNode } from "react";

import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import type { NextPage } from "next";
import { PageContainer } from "../src/Layout/PageContainer";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "../src/createEmotionCache";
import initAuth from "../src/utils/initAuth";
import theme from "../src/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

type AppStateContainerProps = {
  emotionCache: EmotionCache;
};

initAuth();
const AppStateContainer: FC<PropsWithChildren<AppStateContainerProps>> = ({
  children,
  emotionCache,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <AppStateContainer emotionCache={emotionCache}>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>SurvivorPool</title>
      </Head>
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </AppStateContainer>
  );
}
