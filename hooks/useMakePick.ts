// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useMutation } from "@tanstack/react-query";

interface mutationFnProps {
  playerTeamId: string;
  gameId: number;
  nflTeamName: string;
}

const useMakePick = () => {
  const mutationFn = async ({
    playerTeamId,
    gameId,
    nflTeamName,
  }: mutationFnProps) => {
    {
      return await apiFetch(`picks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player_team_id: playerTeamId,
          game_id: gameId,
          nfl_team_name: nflTeamName,
        }),
      });
    }
  };

  const mutation = useMutation({
    mutationKey: ["makePick"],
    mutationFn,
  });

  return mutation;
};

export default useMakePick;
