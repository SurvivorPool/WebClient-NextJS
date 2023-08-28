// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const useGetUserById = (id: string) => {
  const getUserByIdFn = async (id: string) => {
    return await apiFetch(`users/${id}`);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserById", id],
    queryFn: () => getUserByIdFn(id),
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetUserById;
