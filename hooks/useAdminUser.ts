// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useAdminUser = () => {
  const getUsersFn = async () => {
    return await apiFetch(`admin/users`);
  };

  const users = useQuery({
    queryKey: ["getUsers"],
    queryFn: getUsersFn,
  });

  return {
    users,
  };
};

export default useAdminUser;
