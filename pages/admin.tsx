import { Divider, Flex, Title } from "@mantine/core";

import Dashboard from "@/components/Admin/Dashboard";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Admin = () => {
  return (
    <Flex direction="column" gap="16px">
      <Title order={2}>Admin Tools</Title>
      <Divider />
      <Dashboard />
    </Flex>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { user_id, accessToken } = session;

  if (!user_id || !accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  const isAdmin = data?.is_admin || false;

  if (!isAdmin) {
    return {
      redirect: {
        destination: "/leagues",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}

Admin.auth = true;

export default Admin;
