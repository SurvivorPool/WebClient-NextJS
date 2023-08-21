import "../styles/globals.css";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, ReactNode } from "react";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";

import { AppProps } from "next/app";
import AppShell from "@/components/layout/AppShell";
import Head from "next/head";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const BaseProviders = ({ children }: { children: React.ReactNode }) => {
  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "survivorpool-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: "Raleway, sans-serif",
            colors: {
              orange: [
                "#DAD0CC",
                "#CDBAB3",
                "#C3A69A",
                "#BD9280",
                "#BC7D64",
                "#C16945",
                "#C1582D",
                "#A05536",
                "#87503A",
                "#724B3B",
              ],
              yellow: [
                "#FDFAF8",
                "#F5E5D2",
                "#F4D3A9",
                "#FDC37B",
                "#ECB067",
                "#D89F59",
                "#C48F4E",
                "#AC814A",
                "#92734C",
                "#7D674B",
              ],
            },
            primaryColor: "orange",
          }}
        >
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
};

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;

  const getLayout =
    Component.getLayout || ((page) => <AppShell>{page}</AppShell>);

  return (
    <>
      <Head>
        <title>SurvivorPool</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="description" content="SurvivorPool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseProviders>
        <SessionProvider session={pageProps.session}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </BaseProviders>
    </>
  );
}
