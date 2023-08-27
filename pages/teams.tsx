import { Box, Divider, SimpleGrid, Text, Title } from "@mantine/core";

import Card from "@/components/Teams/Card";
import Head from "next/head";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const mockTeams = [
  {
    name: "Test League",
    description: "This is a test league",
    completed: false,
    league_type: "free",
    price: 100,
    pot: 420,
  },
  {
    name: "Blah",
    description: "completed",
    completed: true,
    league_type: "money",
    price: 100,
    pot: 420,
  },
  {
    name: "Free League",
    description: "This is a free league",
    completed: false,
    league_type: "free",
    price: 0,
    pot: 0,
  },
  {
    name: "This is a very long League Name!",
    description: "This is a test league",
    completed: false,
    league_type: "free",
    price: 5,
    pot: 420,
  },
];

const Teams = () => {
  useAuthRedirect();
  return (
    <>
      <Box>
        <Title order={3}>My Teams</Title>
        <Divider my={"16px"} />
        <SimpleGrid
          spacing={"md"}
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 3 },
          ]}
        >
          {mockTeams.map((team) => (
            <Card team={team} key={team.name} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Teams;
