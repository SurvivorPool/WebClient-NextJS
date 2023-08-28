// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { getSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

interface mutationFnProps {
  leagueId: string;
  teamName: string;
}

const useCreateTeam = () => {
  const mutationFn = async ({ leagueId, teamName }: mutationFnProps) => {
    const session = await getSession();

    if (!session) {
      return;
    }

    return await apiFetch(`player_teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: session.user_id,
        league_id: leagueId,
        name: teamName,
      }),
    });
  };

  const mutation = useMutation({
    mutationKey: ["createTeam"],
    mutationFn,
  });

  return mutation;
};

export default useCreateTeam;
