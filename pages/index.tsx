import { Box, Text, Title } from "@mantine/core";

import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import LandingLayout from "@/components/layout/LandingLayout";
import type { NextPageWithLayout } from "./_app";
import { ReactNode } from "react";
import Wave from "react-wavify";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Title
            variant="gradient"
            gradient={{ from: "#FDC37B", to: "#C1582D", deg: 45 }}
            sx={{
              fontFamily: "HappyFox",
              letterSpacing: "2px",
              fontSize: "60px",
            }}
            className="HappyFox"
          >
            SurvivorPool
          </Title>
          <Text
            sx={{
              fontSize: "24px",
            }}
            c="dimmed"
          >
            Sink or Swim
          </Text>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Wave
            fill="url(#gradient)"
            options={{
              height: 100,
              amplitude: 60,
              points: 4,
            }}
            style={{
              height: "400px",
            }}
          >
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="10%" stopColor="#FDC37B" />
                <stop offset="90%" stopColor="#C1582D" />
              </linearGradient>
            </defs>
          </Wave>
        </Box>
      </Box>
    </>
  );
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
