import { Avatar, Box, Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";

import { FC } from "react";

const Profile: FC = () => {
  const { data: session } = useSession();

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
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
    </Box>
  );
};

export default Profile;
