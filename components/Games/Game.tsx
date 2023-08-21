import { FC } from "react";
import { Game } from "@/types";
import { format } from "date-fns";

import { Box, Button, Card, Divider, Flex, Text, Title } from "@mantine/core";

import { getTeamColor } from "@/utils/teamColors";

interface GameProps {
  game: Game;
  onMakePick: (gameId: number, teamName: string, teamAbbrev: string) => void;
}

const Game: FC<GameProps> = ({ game, onMakePick }) => {
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
          <Text c="dimmed">{format(new Date(game.game_date), "PPPP")}</Text>
          <Text c="dimmed">{getGameStatus()}</Text>
        </Flex>
        <Button variant="subtle">View game details</Button>
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
            <Box>
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
                Make Pick
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
            <Box>
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
                Make Pick
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </Card>
  );
};

export default Game;
