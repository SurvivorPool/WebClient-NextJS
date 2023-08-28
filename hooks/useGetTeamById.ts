// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useGetTeamById = (id: string) => {
  const getTeamByIdFn = async (id: string) => {
    return await apiFetch(`player_teams/${id}`);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getTeamById", id],
    queryFn: () => getTeamByIdFn(id),
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetTeamById;
