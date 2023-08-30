import { Box, Button, Modal, SimpleGrid, Text, Title } from "@mantine/core";
import { FC, useState } from "react";
import { Game as GameType, Team } from "@/types";

import Game from "./Game";
import PickModal from "./PickModal";

interface GamesListProps {
  games: Array<GameType>;
  team: Team;
  onPick: () => void;
}

const GamesList: FC<GamesListProps> = ({ games, team, onPick }) => {
  const [pickInfo, setPickInfo] = useState<{
    gameId: number;
    teamName: string;
    teamAbbrev: string;
  }>({
    gameId: 0,
    teamName: "",
    teamAbbrev: "",
  });
  const [isModalOpened, setModalOpen] = useState(false);

  const onMakePickClick = (
    gameId: number,
    teamName: string,
    teamAbbrev: string
  ) => {
    setPickInfo({
      gameId,
      teamName,
      teamAbbrev,
    });
    setModalOpen(true);
  };

  return (
    <>
      <PickModal
        isOpen={isModalOpened}
        onClose={() => setModalOpen(false)}
        pickInfo={pickInfo}
        playerTeamId={team.id}
        onPick={onPick}
      />
      <SimpleGrid cols={1}>
        {games.map((game) => (
          <Game
            key={game.id}
            game={game}
            games={games}
            onMakePick={onMakePickClick}
            hasPick={!!team.current_pick}
            team={team}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GamesList;
