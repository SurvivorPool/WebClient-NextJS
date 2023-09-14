// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useGetLeagueStats = (leagueId?: string) => {
  const getLeagueStatsFn = async () => {
    return await apiFetch(`stats/${leagueId}`);
  };

  return useQuery({
    queryKey: ["getLeagueStats", leagueId],
    queryFn: () => getLeagueStatsFn(leagueId),
  });
};

export default useGetLeagueStats;
