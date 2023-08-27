// @ts-nocheck

import { getSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useGetLeagueById = (id: string) => {
  const router = useRouter();
  const getLeaguesByIDFn = async (id: string) => {
    const session = await getSession();

    if (!session || session.status === "unauthenticated") {
      router.push("/");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leagues/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getLeaguesById", id],
    queryFn: () => getLeaguesByIDFn(id),
  });

  return { data, isLoading, error };
};

export default useGetLeagueById;
