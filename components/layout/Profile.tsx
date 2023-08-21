import { Avatar, Box, Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";

import { FC } from "react";

const Profile: FC = () => {
  const { data: session } = useSession();

  if (!session) {
    return <Button onClick={() => signIn()}>Sign In</Button>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
      }}
    >
      <Avatar radius="xl" />
      <Button onClick={() => signOut()}>Sign Out</Button>
    </Box>
  );
};

export default Profile;
