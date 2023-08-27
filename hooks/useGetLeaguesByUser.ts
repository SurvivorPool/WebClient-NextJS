// @ts-nocheck

import { getSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useGetLeaguesByUser = () => {
  const router = useRouter();
  const getLeaguesByIDFn = async () => {
    const session = await getSession();

    if (!session || session.status === "unauthenticated") {
      router.push("/");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leagues/user/${session.user_id}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getLeaguesById"],
    queryFn: getLeaguesByIDFn,
  });

  return { data, isLoading, error };
};

export default useGetLeaguesByUser;
