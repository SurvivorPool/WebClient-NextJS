import { Box, Button, MediaQuery } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";

import Avatar from "../Common/Avatar";
import { FC } from "react";
import { useRouter } from "next/router";

const Profile: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const signout = async () => {
    const url = new URL(process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URL || "");
    await signOut();
    await router.push(url);
  };
  if (!session) {
    return (
      <Button
        onClick={() =>
          signIn(undefined, {
            callbackUrl: "/leagues",
          })
        }
      >
        Sign In
      </Button>
    );
  }

  const { user } = session;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
      }}
    >
      <MediaQuery
        smallerThan={"xs"}
        styles={{
          display: "none",
        }}
      >
        <Box>
          <Avatar name={user?.name || ""} size="md" />
        </Box>
      </MediaQuery>
      <Button onClick={async () => await signout()}>Sign Out</Button>
    </Box>
  );
};

export default Profile;
