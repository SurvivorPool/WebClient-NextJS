export const getLeagues = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leagues`, {
    method: "GET",
    headers: new Headers({
      auth: token,
    }),
  });
  return response.json();
};
