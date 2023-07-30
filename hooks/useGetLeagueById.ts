import { useQuery } from "@tanstack/react-query";

const useGetLeagueById = (id: string) => {
  const getLeaguesByIDFn = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leagues/${id}`);
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getLeaguesById", id],
    queryFn: () => getLeaguesByIDFn(id),
  });

  return { data, isLoading, error };
};

export default useGetLeagueById;
