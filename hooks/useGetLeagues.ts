// @ts-nocheck

import { getSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useGetLeagues = () => {
  const router = useRouter();

  const getLeaguesFn = async () => {
    const session = await getSession();

    if (!session || session.status === "unauthenticated") {
      router.push("/");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leagues`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    return res.json();
  };
  const { data, isLoading, error } = useQuery(["getLeagues"], getLeaguesFn);

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetLeagues;
