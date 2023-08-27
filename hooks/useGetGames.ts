// @ts-nocheck

import { getSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useGetGames = () => {
  const router = useRouter();
  const getGamesFn = async () => {
    const session = await getSession();

    if (!session || session.status === "unauthenticated") {
      router.push("/");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    return res.json();
  };

  const { data, isLoading, error } = useQuery(["getGames"], () => getGamesFn());

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetGames;
