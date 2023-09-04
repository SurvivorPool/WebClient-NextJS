import { Flex, Text, Title } from "@mantine/core";

import Head from "next/head";
import LandingLayout from "@/components/layout/LandingLayout";
import { ReactNode } from "react";

const NotFound = () => {
  return (
    <Flex
      h={"100%"}
      align={"center"}
      justify={"center"}
      direction={"column"}
      sx={(theme) => ({
        padding: "30px",
        border: `1px solid ${theme.colors.gray[5]}`,
        background: `linear-gradient(to right, ${theme.colors.orange[5]}, ${theme.colors.yellow[5]})`,
      })}
    >
      <Title
        c={"white"}
        sx={{
          fontFamily: "Times New Roman",
          fontSize: "120px",
        }}
      >
        404
      </Title>
      <Text fz="xl" c="white">
        Page not found.
      </Text>
    </Flex>
  );
};

NotFound.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      <Head>
        <title>SurvivorPool</title>
      </Head>
      <LandingLayout>{page}</LandingLayout>
    </>
  );
};
export default NotFound;
