import { useMutation } from "@tanstack/react-query";

interface mutationFnProps {
  userId: string;
  leagueId: string;
  teamName: string;
}

const useCreateTeam = () => {
  const mutationFn = async ({
    userId,
    leagueId,
    teamName,
  }: mutationFnProps) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player_teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
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
