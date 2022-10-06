import { Avatar, Box } from "@mui/material";

import { FC } from "react";

interface ProfileProps {
  url?: string;
}

export const Profile: FC<ProfileProps> = ({ url }) => (
  <Box>
    <Avatar src={url} />
  </Box>
);
