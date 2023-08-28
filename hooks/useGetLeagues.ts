// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useGetLeagues = () => {
  const getLeaguesFn = async () => {
    return await apiFetch(`leagues`);
  };
  const { data, isLoading, error } = useQuery(["getLeagues"], getLeaguesFn);

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetLeagues;
