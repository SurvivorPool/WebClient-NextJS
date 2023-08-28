// @ts-nocheck

import { getSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const useIsAdmin = () => {
  const getIsAdminFn = async () => {
    const session = await getSession();
    const { user_id } = session;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await res.json();

    return data?.is_admin || false;
  };

  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: getIsAdminFn,
  });
};

export default useIsAdmin;
