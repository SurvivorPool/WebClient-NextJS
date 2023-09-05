import apiFetch from "@/utils/apiFetch";
import { useMutation } from "@tanstack/react-query";

const useUpdateTeamName = (playerTeamId: string) => {
  const updateTeamNameFn = async (name: string) => {
    return await apiFetch(`player_teams/${playerTeamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
  };

  return useMutation({
    mutationKey: ["updateTeamName"],
    mutationFn: updateTeamNameFn,
  });
};

export default useUpdateTeamName;
