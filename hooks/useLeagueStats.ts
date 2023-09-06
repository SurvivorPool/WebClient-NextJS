import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useLeagueStats = (leagueId: string) => {
  const leagueStatsFn = async () => {
    return await apiFetch(`stats/${leagueId}`);
  };

  return useQuery({
    queryKey: ["leagueStats", leagueId],
    queryFn: leagueStatsFn,
    enabled: !!leagueId,
  });
};

export default useLeagueStats;
