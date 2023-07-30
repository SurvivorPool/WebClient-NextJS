import { useQuery } from "@tanstack/react-query";

const useGetTeamById = (id: string) => {
  const getTeamByIdFn = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/player_teams/${id}`
    );
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
