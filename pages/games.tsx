import { Box, Button, Divider, Loader, Title } from "@mantine/core";

import GamesList from "@/components/Games/GamesList";
import { useCallback } from "react";
import useGetGames from "@/hooks/useGetGames";
import { useRouter } from "next/router";

const Games = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetGames();

  const onBackToTeamClick = useCallback(() => {
    if (router.query.team_id) {
      router.push(`/team/${router.query.team_id}`);
    }
  }, [router.query.team_id]);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Title order={4}>This week's games</Title>
        <Button variant="outline" onClick={onBackToTeamClick}>
          Back to Team
        </Button>
      </Box>
      <Divider />
      <GamesList
        games={data?.games}
        playerTeamId={router.query.team_id as string}
      />
    </Box>
  );
};

Games.auth = true;

export default Games;
