import { useQuery } from "@tanstack/react-query";

const useGetLeaguesByUser = (userId: string) => {
  const getLeaguesByIDFn = async (userId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leagues/user/${userId}`
    );
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getLeaguesById", userId],
    queryFn: () => getLeaguesByIDFn(userId),
  });

  return { data, isLoading, error };
};

export default useGetLeaguesByUser;
