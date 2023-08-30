import { Divider, Flex, Title } from "@mantine/core";

import CreateLeague from "./CreateLeague";
import CreateLeagueType from "./CreateLeagueType";
import LeaguesList from "./LeaguesList";
import useGetLeagues from "@/hooks/useGetLeagues";

const Section = () => {
  const { data, isLoading } = useGetLeagues();

  return (
    <Flex direction={"column"} gap={"16px"}>
      <Title order={4}>League Tools</Title>
      <Divider />
      <LeaguesList leagues={data?.leagues || []} isLoading={isLoading} />
      <Divider />
      <CreateLeagueType />
      <Divider />
      <CreateLeague />
    </Flex>
  );
};

export default Section;
