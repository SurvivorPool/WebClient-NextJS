import { useQuery } from "@tanstack/react-query";

const useGetLeagues = () => {
  const getLeaguesFn = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leagues`);
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
