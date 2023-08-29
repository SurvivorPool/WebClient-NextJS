// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useGetGames = () => {
  const getGamesFn = async () => {
    return await apiFetch(`games`);
  };

  const { data, isLoading, error } = useQuery(["getGames"], () => getGamesFn());

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetGames;
