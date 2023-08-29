// @ts-nocheck

import { useMutation, useQuery } from "@tanstack/react-query";

import apiFetch from "@/utils/apiFetch";

const useAdminPlayerTeam = () => {
  const getPlayerTeamsFn = async () => {
    return await apiFetch(`admin/player_teams`);
  };

  const updatePlayerTeamFn = async ({ id, paid, active }) => {
    return await apiFetch(`admin/player_teams/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active,
        paid,
      }),
    });
  };

  const deletePlayerTeamFn = async ({ id }) => {
    return await apiFetch(`admin/player_teams/${id}`, {
      method: "DELETE",
    });
  };

  const playerTeams = useQuery({
    queryKey: ["getPlayerTeams"],
    queryFn: getPlayerTeamsFn,
  });

  const updatePlayerTeamMutation = useMutation({
    mutationKey: ["updatePlayerTeam"],
    mutationFn: updatePlayerTeamFn,
  });

  const deletePlayerTeamMutation = useMutation({
    mutationKey: ["deletePlayerTeam"],
    mutationFn: deletePlayerTeamFn,
  });

  return {
    playerTeams,
    updatePlayerTeam: updatePlayerTeamMutation,
    deletePlayerTeam: deletePlayerTeamMutation,
  };
};

export default useAdminPlayerTeam;
