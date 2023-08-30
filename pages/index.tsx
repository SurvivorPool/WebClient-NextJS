import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import LandingLayout from "@/components/layout/LandingLayout";
import type { NextPageWithLayout } from "./_app";
import { ReactNode } from "react";
import { Title } from "@mantine/core";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/leagues",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Home;
