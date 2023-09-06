import { Box, Card, Flex, Text, Title } from "@mantine/core";

import { FC } from "react";
import useLeagueStats from "@/hooks/useLeagueStats";

interface StatsProps {
  leagueId: string;
}

const Stats: FC<StatsProps> = ({ leagueId }) => {
  const { data, isLoading } = useLeagueStats(leagueId);

  return data && !isLoading ? (
    <Card>
      <Title order={3}>League Status</Title>
      <Flex>
        <Box>
          <Text></Text>
        </Box>
      </Flex>
    </Card>
  ) : null;
};

export default Stats;
