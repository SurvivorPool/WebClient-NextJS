// @ts-nocheck

import { useMutation, useQuery } from "@tanstack/react-query";

import apiFetch from "@/utils/apiFetch";

interface createLeagueMutationFnProps {
  name: string;
  typeId: string;
  description: string;
  price: number;
}

interface createLeagueTypeMutationFnProps {
  name: string;
  description: string;
}

const useAdminLeague = () => {
  const getLeagueTypesFn = async () => {
    return await apiFetch(`admin/league_types`);
  };

  const createLeagueTypeMutationFn = async ({
    name,
    description,
  }: createLeagueTypeMutationFnProps) => {
    return await apiFetch(`admin/league_types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
  };

  const createLeagueMutationFn = async ({
    name,
    typeId,
    description,
    price,
  }: createLeagueMutationFnProps) => {
    return await apiFetch(`admin/leagues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        type_id: typeId,
        description: description,
        price: price,
      }),
    });
  };

  const leagueTypes = useQuery({
    queryKey: ["getLeagueTypes"],
    queryFn: getLeagueTypesFn,
  });

  const createLeagueMutation = useMutation({
    mutationKey: ["createLeague"],
    mutationFn: createLeagueMutationFn,
  });

  const createLeagueTypeMutation = useMutation({
    mutationKey: ["createLeagueType"],
    mutationFn: createLeagueTypeMutationFn,
    onSuccess: () => {
      leagueTypes.refetch();
    },
  });

  return {
    createLeague: createLeagueMutation,
    createLeagueType: createLeagueTypeMutation,
    leagueTypes,
  };
};

export default useAdminLeague;
