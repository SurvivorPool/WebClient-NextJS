// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useGetLeagueById = (id: string) => {
  const getLeaguesByIDFn = async (id: string) => {
    return await apiFetch(`leagues/${id}`);
  };

  return useQuery({
    queryKey: ["getLeaguesById", id],
    queryFn: () => getLeaguesByIDFn(id),
    enabled: !!id,
  });
};

export default useGetLeagueById;
