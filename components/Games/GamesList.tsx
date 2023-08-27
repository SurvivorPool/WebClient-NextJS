import { Box, Button, Modal, SimpleGrid, Text, Title } from "@mantine/core";
import { FC, useState } from "react";

import Game from "./Game";
import { Game as GameType } from "@/types";
import PickModal from "./PickModal";

interface GamesListProps {
  games: Array<GameType>;
  playerTeamId: string;
}

const GamesList: FC<GamesListProps> = ({ games, playerTeamId }) => {
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
        playerTeamId={playerTeamId}
      />
      <SimpleGrid cols={1}>
        {games.map((game) => (
          <Game key={game.id} game={game} onMakePick={onMakePickClick} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GamesList;
