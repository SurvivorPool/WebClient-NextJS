import { Box, Divider, Loader, SimpleGrid, Text, Title } from "@mantine/core";

import AvailableLeagues from "@/components/Leagues/AvailableLeagues";
import MyLeagues from "@/components/Leagues/MyLeagues";

const Leagues = () => {
  return (
    <>
      <MyLeagues />
      <AvailableLeagues />
    </>
  );
};
export default Leagues;
