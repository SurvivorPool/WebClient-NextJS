// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useGetGames = () => {
  const getGamesFn = async () => {
    return await apiFetch(`games`);
  };

  return useQuery(["getGames"], () => getGamesFn());
};

export default useGetGames;
