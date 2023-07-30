import "../styles/globals.css";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { useState } from "react";

const queryClient = new QueryClient();

const BaseProviders = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

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

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>SurvivorPool</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BaseProviders>
    </>
  );
}
