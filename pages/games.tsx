import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Loader,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";

import GamesList from "@/components/Games/GamesList";
import { useCallback } from "react";
import useGetGames from "@/hooks/useGetGames";
import useGetTeamById from "@/hooks/useGetTeamById";
import { useRouter } from "next/router";

const Games = () => {
  const router = useRouter();
  const {
    data: gamesData,
    isLoading: isGamesLoading,
    refetch: refetchGames,
  } = useGetGames();
  const {
    data: teamData,
    isLoading: isTeamLoading,
    refetch: refetchTeam,
  } = useGetTeamById(router.query.team_id as string);

  const onBackToTeamClick = useCallback(() => {
    if (router.query.team_id) {
      router.push(`/team/${router.query.team_id}`);
    }
  }, [router.query.team_id]);

  if (isGamesLoading || isTeamLoading) {
    return <Loader />;
  }

  const onPick = () => {
    refetchGames();
    refetchTeam();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <SimpleGrid
        spacing={"md"}
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <Flex direction="column" gap="16px">
          <Flex direction="column" gap="4px">
            <Title order={2}>Make a pick</Title>
            <Text color="dimmed">
              {`for ${teamData?.name} - ${teamData?.user?.full_name}`}
            </Text>
          </Flex>
          <Text>
            Choose a team to win this week. If they win, you win. If they lose,
            well, you lose.
          </Text>
          <Text>
            You can only choose a team <b>once</b> per season over the course of
            a league. You can change your pick up until the game starts. Good
            luck!
          </Text>
          {teamData?.current_pick && (
            <Box
              sx={(theme) => ({
                padding: "6px",
                borderRadius: "4px",
                background: `linear-gradient(to right, ${theme.colors.orange[5]}, ${theme.colors.yellow[5]})`,
              })}
            >
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Text size="xl ">
                  {`You've currently picked the `}
                  <b>{teamData?.current_pick}</b>
                </Text>
              </Card>
            </Box>
          )}
        </Flex>
        <Flex justify={"flex-end"}>
          <Button variant="outline" onClick={onBackToTeamClick}>
            Back to Team
          </Button>
        </Flex>
      </SimpleGrid>
      <Divider />
      <GamesList games={gamesData?.games} team={teamData} onPick={onPick} />
    </Box>
  );
};

Games.auth = true;

export default Games;
