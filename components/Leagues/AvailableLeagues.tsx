import { Box, Divider, SimpleGrid, Text, Title } from "@mantine/core";

import Card from "@/components/Leagues/Card";
import CardSkeleton from "./Skeleton";
import { FC } from "react";
import { League } from "@/types";
import useGetLeagues from "@/hooks/useGetLeagues";

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
      <Text> No Leagues Available</Text>
    </Box>
  );
};

const AvailableLeagues: FC = () => {
  const { data, isLoading } = useGetLeagues();
  const leagues = data?.leagues || [];

  return (
    <Box
      sx={{
        marginTop: "48px",
      }}
    >
      <Title order={3}>Leagues Available</Title>
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

export default AvailableLeagues;
