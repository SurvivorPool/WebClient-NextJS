import { Box, Divider, Loader, Title } from "@mantine/core";

import GamesList from "@/components/Games/GamesList";
import useGetGames from "@/hooks/useGetGames";

const Games = () => {
  const { data, isLoading, error } = useGetGames();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Title order={4}>This week's games</Title>
      <Divider />
      <GamesList games={data?.games} />
    </Box>
  );
};

export default Games;
