import { Box, Divider, Loader, SimpleGrid, Text, Title } from "@mantine/core";

import Card from "@/components/Leagues/Card";
import { FC } from "react";
import useGetLeagues from "@/hooks/useGetLeagues";

const AvailableLeagues: FC = () => {
  const { data, isLoading, error } = useGetLeagues();
  const leagues = data?.leagues || [];

  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        marginTop: "48px",
      }}
    >
      <Title order={3}>Leagues Available</Title>
      <Divider my={"16px"} />
      {leagues?.length > 0 ? (
        <SimpleGrid
          spacing={"md"}
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 3 },
          ]}
        >
          {leagues.map((league: any) => (
            <Card league={league} key={league.name} />
          ))}
        </SimpleGrid>
      ) : (
        <Box>
          <Text> No Leagues Available</Text>
        </Box>
      )}
    </Box>
  );
};

export default AvailableLeagues;
