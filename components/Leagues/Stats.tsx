// @ts-nocheck

import {
  Card,
  Flex,
  Loader,
  RingProgress,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { FC, useMemo } from "react";

import { League } from "@/types";
import useGetLeagueStats from "@/hooks/useGetLeagueStats";

interface StatsProps {
  league: League;
}

const Stats: FC<StatsProps> = ({ league }) => {
  const { data, isLoading } = useGetLeagueStats(league?.id);

  const percentActiveTeams = useMemo(() => {
    if (!data || isLoading) {
      return 0;
    }

    const { league_stats } = data;
    return Math.round((league_stats.active / league_stats.total) * 100);
  }, [data, isLoading]);

  const percentInactiveTeams = useMemo(() => {
    if (!data || isLoading) {
      return 0;
    }
    const { league_stats } = data;
    return Math.round((league_stats.inactive / league_stats.total) * 100);
  }, [data, isLoading]);

  const previousWeekPicks = useMemo(() => {
    if (!data || isLoading) {
      return [];
    }

    return data?.previous_week_picks_current_league.sort(
      (a, b) => b.count - a.count
    );
  }, [data, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card>
      <Flex direction="column" gap="16px">
        <Title order={3}>Statistics</Title>
        <Flex
          justify={"space-around"}
          sx={{
            width: "100%",
          }}
        >
          <RingProgress
            size={200}
            sections={[
              {
                value: percentActiveTeams,
                color: "green",
                tooltip: `${data.league_stats.active} Teams Active`,
              },
              {
                value: percentInactiveTeams,
                color: "red",
                tooltip: `${data.league_stats.inactive} Teams Eliminated`,
              },
            ]}
            label={
              <Flex direction="column" gap="4px">
                <Text color="orange" weight={700} align="center" size="xl">
                  {`${percentActiveTeams}%`}
                </Text>
                <Text color="orange" align="center" size="md">
                  Teams Active
                </Text>
              </Flex>
            }
          />
          <Flex w="50%" direction="column" gap="16px" maw={"600px"}>
            <Title order={5}>Top 5 NFL Teams Picked (last week)</Title>
            <Table>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {previousWeekPicks.slice(0, 5).map(({ team_name, count }) => (
                  <tr key={team_name}>
                    <td>{team_name}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Stats;
