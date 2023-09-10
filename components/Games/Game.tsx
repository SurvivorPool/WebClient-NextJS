// @ts-nocheck

import { FC, useMemo } from "react";
import { Game, Team } from "@/types";
import { format } from "date-fns";

import { Box, Button, Card, Divider, Flex, Text, Title } from "@mantine/core";

import { getTeamColor } from "@/utils/teamColors";

interface GameProps {
  game: Game;
  team: Team;
  games: Array<Game>;
  hasPick: boolean;
  onMakePick: (gameId: number, teamName: string, teamAbbrev: string) => void;
}

const Game: FC<GameProps> = ({
  game,
  games,
  team,
  onMakePick,
  hasPick = false,
}) => {
  // TODO: redesign

  const awayColor = getTeamColor(game.away_team_info.abbreviation);
  const homeColor = getTeamColor(game.home_team_info.abbreviation);

  const getGameStatus = () => {
    const gameOver = game.has_started && game.quarter === "F";

    if (gameOver) {
      return "Final";
    } else if (!game.has_started) {
      return "Pregame";
    } else {
      return `In Progress | ${game.quarter} - ${game.quarter_time}`;
    }
  };

  const canPick = useMemo(() => {
    const currentPick = team.current_pick;
    let canMakePick = true;

    if (currentPick) {
      const currentPickGame = games.find(
        (g: Game) =>
          g.away_team_info.nickname === currentPick ||
          g.home_team_info.nickname === currentPick
      );
      if (currentPickGame?.has_started) {
        canMakePick = false;
      }
    }

    if (game.has_started) {
      canMakePick = false;
    }

    if (!canMakePick) {
      return {
        canMakePick,
        canPickHome: false,
        canPickAway: false,
      };
    }

    const homeTeamName = game.home_team_info.nickname;
    const awayTeamName = game.away_team_info.nickname;

    const canPickHome =
      currentPick !== homeTeamName && !team.pick_history.includes(homeTeamName);
    const canPickAway =
      currentPick !== awayTeamName && !team.pick_history.includes(awayTeamName);

    return {
      canMakePick,
      canPickHome,
      canPickAway,
    };
  }, [game, games, team]);

  return (
    <Card
      padding="none"
      sx={(theme) => ({
        border: `1px solid ${theme.colors.gray[5]}`,
        padding: "8px",
      })}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify="space-between"
        sx={{
          padding: "8px",
          alignItems: "center",
        }}
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify="space-between"
          sx={{
            padding: "8px",
            alignItems: "center",
          }}
        >
          <Text c="dimmed">{format(new Date(game.game_date), "PPPP h:mm a")}</Text>
          <Text c="dimmed">{getGameStatus()}</Text>
          <Text c="dimmed">Odds: {game.odds.details}</Text>
        </Flex>
        {/*<Button variant="subtle">View game details</Button>*/}
      </Flex>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          gap: "4px",
        }}
      >
        <Box
          sx={{
            width: "50%",
            borderRadius: "4px",
            background: awayColor,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "8px",
          }}
        >
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={{ base: "sm", sm: "lg" }}
              justify="space-between"
            >
              <Title
                order={1}
                sx={{
                  color: awayColor,
                  fontSize: "40px",
                }}
              >
                {game.away_team_info.abbreviation}
              </Title>
              <Text
                sx={{
                  fontSize: "32px",
                  color: awayColor,
                }}
              >
                {game.away_team_score}
              </Text>
            </Flex>
            <Divider />
            <Box
              sx={{
                visibility: canPick.canPickAway ? "visible" : "hidden",
              }}
            >
              <Button
                variant="filled"
                onClick={() =>
                  onMakePick(
                    game.id,
                    game.away_team_info.nickname,
                    game.away_team_info.abbreviation
                  )
                }
                sx={{
                  background: awayColor,

                  "&:hover": {
                    background: awayColor,
                    opacity: 0.8,
                  },
                }}
              >
                {hasPick ? "Change Pick" : "Make Pick"}
              </Button>
            </Box>
          </Card>
        </Box>
        <Box
          sx={{
            width: "50%",
            borderRadius: "4px",
            background: homeColor,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            padding: "8px",
          }}
        >
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={{ base: "sm", sm: "lg" }}
              justify={{ base: "center", sm: "space-between" }}
            >
              <Title
                order={1}
                sx={{
                  color: homeColor,
                  fontSize: "40px",
                }}
              >
                {game.home_team_info.abbreviation}
              </Title>
              <Text
                sx={{
                  fontSize: "32px",
                  color: homeColor,
                }}
              >
                {game.home_team_score}
              </Text>
            </Flex>
            <Divider />
            <Box
              sx={{
                visibility: canPick.canPickHome ? "visible" : "hidden",
              }}
            >
              <Button
                variant="filled"
                onClick={() =>
                  onMakePick(
                    game.id,
                    game.home_team_info.nickname,
                    game.home_team_info.abbreviation
                  )
                }
                sx={{
                  background: homeColor,

                  "&:hover": {
                    background: homeColor,
                    opacity: 0.8,
                  },
                }}
              >
                {hasPick ? "Change Pick" : "Make Pick"}
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </Card>
  );
};

export default Game;
