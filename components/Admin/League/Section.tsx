import { Divider, Flex, Title } from "@mantine/core";

import CreateLeague from "./CreateLeague";
import CreateLeagueType from "./CreateLeagueType";

const Section = () => {
  return (
    <Flex direction={"column"} gap={"16px"}>
      <Title order={4}>League Tools</Title>
      <Divider />
      <CreateLeagueType />
      <Divider />
      <CreateLeague />
    </Flex>
  );
};

export default Section;
