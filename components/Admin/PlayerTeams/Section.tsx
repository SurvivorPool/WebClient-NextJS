import { Divider, Flex, Title } from "@mantine/core";

import PlayerTeamsList from "./PlayerTeamsList";

const Section = () => {
  return (
    <Flex direction={"column"} gap={"16px"}>
      <Title order={4}>Player Team Tools</Title>
      <Divider />
      <PlayerTeamsList />
    </Flex>
  );
};

export default Section;
