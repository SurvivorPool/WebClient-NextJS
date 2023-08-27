import { Box, Divider, Loader, SimpleGrid, Text, Title } from "@mantine/core";

import Card from "@/components/Leagues/Card";
import { FC } from "react";
import { League } from "@/types";
import useGetLeaguesByUser from "@/hooks/useGetLeaguesByUser";
import { useSession } from "next-auth/react";

const MyLeagues: FC = () => {
  const { data, isLoading, error } = useGetLeaguesByUser();
  const leagues = data?.leagues || [];

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Title order={3}>My Leagues</Title>
      <Divider my={"16px"} />
      {leagues?.length > 0 ? (
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
            You're not currently in any league. Join one from the Leagues
            Available below!
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default MyLeagues;
