import Head from "next/head";
import Image from "next/image";
import LandingLayout from "@/components/layout/LandingLayout";
import type { NextPageWithLayout } from "./_app";
import { ReactNode } from "react";

const Home: NextPageWithLayout = () => {
  return <main></main>;
};

Home.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      <Head>
        <title>SurvivorPool</title>
      </Head>
      <LandingLayout>{page}</LandingLayout>
    </>
  );
};

export default Home;
