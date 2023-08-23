import { Container } from "@mantine/core";
import Head from "next/head";
import LandingLayout from "@/components/layout/LandingLayout";
import { ReactNode } from "react";

const DataPolicy = () => (
  <Container>
    <h1>Data Policy and Data Deletion Requests</h1>
    <p>Last updated: August 02, 2023</p>
    <h3>Data Deletion Requests</h3>
    <p>
      To have any of your data deleted, please send an request to
      admin@survivorpool.win and your request will be processed within 3
      business days.
    </p>
    <p>
      Any questions about our data retention policy can also be answered by
      emailing admin@survivorpool.win
    </p>
  </Container>
);

DataPolicy.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      <Head>
        <title>SurvivorPool</title>
      </Head>
      <LandingLayout>{page}</LandingLayout>
    </>
  );
};

export default DataPolicy;
