import { Avatar, Box, Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";

import { FC } from "react";
import {useRouter} from "next/router";

const Profile: FC = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const signout = async () => {
      const url = new URL(process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URL || "");
      await signOut();
      await router.push(url)
  }
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

  // @ts-ignore
  const initial = (user.name[0] || "u").toUpperCase();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
      }}
    >
      <Avatar radius="xl" color="orange">
        {initial}
      </Avatar>
      <Button onClick={async () => await signout()}>Sign Out</Button>
    </Box>
  );
};

export default Profile;
