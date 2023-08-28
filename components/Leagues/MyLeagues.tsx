// @ts-nocheck

import { Box, Divider, SimpleGrid, Text, Title } from "@mantine/core";

import Card from "@/components/Leagues/Card";
import CardSkeleton from "./Skeleton";
import { FC } from "react";
import { League } from "@/types";
import useGetLeaguesByUser from "@/hooks/useGetLeaguesByUser";
import { useSession } from "next-auth/react";

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

const MyLeagues: FC = () => {
  const { data: session, status } = useSession();
  const { data, isLoading } = useGetLeaguesByUser(session?.user_id || null);
  const leagues = data?.leagues || [];
  const shouldShowLoading = isLoading || status === "loading";

  return (
    <Box
      sx={{
        minHeight: "300px",
      }}
    >
      <Title order={3}>My Leagues</Title>
      <Divider my={"16px"} />
      {shouldShowLoading ? (
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
