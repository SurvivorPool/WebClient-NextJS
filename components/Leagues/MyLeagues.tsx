// @ts-nocheck

import { Box, Divider, SimpleGrid, Text, Title } from "@mantine/core";

import Card from "@/components/Leagues/Card";
import CardSkeleton from "./Skeleton";
import { FC } from "react";
import { League } from "@/types";

const LeagueGrid: FC<{ leagues: Array<League> }> = ({ leagues }) => {
  return leagues?.length > 0 ? (
    <SimpleGrid
      spacing={"md"}
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
      ]}
    >
      {leagues?.map((league: League) => (
        <Card league={league} key={`Mine-${league.id}`} />
      ))}
    </SimpleGrid>
  ) : (
    <Box>
      <Text>
        You're not currently in any league. Join one from the Leagues Available
        below!
      </Text>
    </Box>
  );
};

const MyLeagues: FC = ({ leagues, isLoading }) => {
  return (
    <Box
      sx={{
        minHeight: "300px",
      }}
    >
      <Title order={3}>My Leagues</Title>
      <Divider my={"16px"} />
      {isLoading ? (
        <SimpleGrid
          spacing={"md"}
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 3 },
          ]}
        >
          <CardSkeleton />
        </SimpleGrid>
      ) : (
        <LeagueGrid leagues={leagues} />
      )}
    </Box>
  );
};

export default MyLeagues;
