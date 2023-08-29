// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useGetLeaguesByUser = (userId?: string) => {
  const getLeaguesByIDFn = async () => {
    return await apiFetch(`leagues/user/${userId}`);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getLeaguesById", userId],
    queryFn: () => getLeaguesByIDFn(userId),
    enabled: !!userId,
  });

  return { data, isLoading, error };
};

export default useGetLeaguesByUser;
