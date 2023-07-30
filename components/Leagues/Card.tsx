import {
  Box,
  Divider,
  Card as MantineCard,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconFlag, IconPlayerPlay } from "@tabler/icons-react";

import { FC } from "react";
import { League } from "@/types";
import { currencyFormatter } from "@/utils/formatters";
import { useRouter } from "next/router";

interface CardProps {
  league: League;
}

const Card: FC<CardProps> = ({ league }) => {
  const router = useRouter();
  const displayPrice =
    (league.league_type as unknown as string) === "free"
      ? "Free"
      : currencyFormatter.format(league.price);

  const progressIcon = league.completed ? (
    <IconFlag color="red" />
  ) : (
    <IconPlayerPlay color="green" />
  );

  const onClick = () => {
    router.push(`/leagues/${league.id}`);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: "6px",
        position: "relative",
        background: `linear-gradient(to right, ${theme.colors.orange[5]}, ${theme.colors.yellow[5]})`,
        cursor: "pointer",
        borderRadius: "4px",

        "&:hover": {
          transform: "scale(1.02) perspective(0px)",
          boxShadow: "0 10px 10px rgba(0,0,0,.1)",
        },
      })}
    >
      <MantineCard
        withBorder
        shadow="sm"
        padding="lg"
        onClick={onClick}
        sx={{
          borderRadius: "4px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            top: 8,
            right: 8,
            position: "absolute",
          }}
        >
          {progressIcon}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "8px",
          }}
        >
          <Box>
            <Title order={3}>{league.name}</Title>
            <Text
              sx={(theme) => ({
                color: theme.colors.gray[6],
              })}
            >
              {league.description}
            </Text>
          </Box>
          <Divider />
          <SimpleGrid cols={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                fz={"sm"}
                sx={(theme) => ({
                  fontWeight: 800,
                  color: theme.colors.gray[5],
                })}
              >
                Buy-In
              </Text>
              <Text fz={"xl"}>{displayPrice}</Text>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                fz={"sm"}
                sx={(theme) => ({
                  fontWeight: 800,
                  color: theme.colors.gray[5],
                })}
              >
                Pot
              </Text>
              <Text fz={"xl"}>{currencyFormatter.format(league.pot)}</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </MantineCard>
    </Box>
  );
};

export default Card;
