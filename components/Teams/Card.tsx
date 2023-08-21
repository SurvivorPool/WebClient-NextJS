import { Box, Card as MantineCard, Text, Title } from "@mantine/core";
import { IconFlag, IconPlayerPlay } from "@tabler/icons-react";

import { FC } from "react";

type Team = {
  // TODO: move
  name: string;
  description: string;
  completed: boolean;
  league_type: string;
  price: number;
  pot: number;
};

interface CardProps {
  team: Team;
}

const Card: FC<CardProps> = ({ team }) => {
  return (
    <MantineCard
      withBorder
      shadow="sm"
      padding="lg"
      sx={{
        borderRadius: "4px",
        position: "relative",
        cursor: "pointer",

        "&:hover": {
          transform: "scale(1.02) perspective(0px)",
          boxShadow: "0 10px 10px rgba(0,0,0,.1)",
        },
      }}
    >
      <Text>hello</Text>
    </MantineCard>
  );
};

export default Card;
