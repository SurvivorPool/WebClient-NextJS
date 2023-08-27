// @ts-nocheck

import { getSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface mutationFnProps {
  playerTeamId: string;
  gameId: number;
  nflTeamName: string;
}

const useMakePick = () => {
  const router = useRouter();
  const mutationFn = async ({
    playerTeamId,
    gameId,
    nflTeamName,
  }: mutationFnProps) => {
    {
      const session = await getSession();

      if (!session || session.status === "unauthenticated") {
        router.push("/");
      }

      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/picks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
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
