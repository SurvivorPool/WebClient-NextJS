// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useGetLeagues = () => {
  const getLeaguesFn = async () => {
    return await apiFetch(`leagues`);
  };
  return useQuery(["getLeagues"], getLeaguesFn);
};

export default useGetLeagues;
