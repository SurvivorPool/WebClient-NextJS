import { useMutation } from "@tanstack/react-query";

interface mutationFnProps {
  playerTeamId: string;
  gameId: string;
  nflTeamName: string;
}

const useMakePick = () => {
  const mutationFn = async ({
    playerTeamId,
    gameId,
    nflTeamName,
  }: mutationFnProps) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/picks`, {
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
  };

  const mutation = useMutation({
    mutationKey: ["makePick"],
    mutationFn,
  });

  return mutation;
};

export default useMakePick;
