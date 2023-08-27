// @ts-nocheck

import { getSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface mutationFnProps {
  userId: string;
  leagueId: string;
  teamName: string;
}

const useCreateTeam = () => {
  const router = useRouter();
  const mutationFn = async ({
    userId,
    leagueId,
    teamName,
  }: mutationFnProps) => {
    {
      const session = await getSession();

      if (!session || session.status === "unauthenticated") {
        router.push("/");
      }

      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player_teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          user_id: userId,
          league_id: leagueId,
          name: teamName,
        }),
      });
    }
  };

  const mutation = useMutation({
    mutationKey: ["createTeam"],
    mutationFn,
  });

  return mutation;
};

export default useCreateTeam;
