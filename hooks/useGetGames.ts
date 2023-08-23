import { useQuery } from "@tanstack/react-query";

const useGetGames = () => {
  const getGamesFn = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`);
    return res.json();
  };

  const { data, isLoading, error } = useQuery(["getGames"], getGamesFn);

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetGames;
