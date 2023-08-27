// @ts-nocheck

import { getSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useGetTeamById = (id: string) => {
  const router = useRouter();
  const getTeamByIdFn = async (id: string) => {
    const session = await getSession();

    if (!session || session.status === "unauthenticated") {
      router.push("/");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/player_teams/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getTeamById", id],
    queryFn: () => getTeamByIdFn(id),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetTeamById;
