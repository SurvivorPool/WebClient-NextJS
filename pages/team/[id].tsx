import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Loader,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import useGetTeamById from "@/hooks/useGetTeamById";
import { useRouter } from "next/router";

const Team = () => {
  useAuthRedirect();
  const router = useRouter();
  const { data, isLoading, error } = useGetTeamById(router.query.id as string);

  if (isLoading) return <Loader />;

  console.log(data, "data");

  const onLeagueClick = () => {
    router.push(`/leagues/${data.league_id}`);
  };

  const onPickClick = () => {
    router.push(`/games`); // TODO pass team id
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <SimpleGrid
        spacing={"md"}
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Title order={2}>{data.name}</Title>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar src={data?.user?.picture_url} radius={"xl"} />
            <Text>{data?.user?.full_name}</Text>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={onPickClick}>Make a Pick</Button>
          <Button variant="outline" onClick={onLeagueClick}>
            Go to League
          </Button>
        </Box>
      </SimpleGrid>
      <Divider />
      <Box
        sx={(theme) => ({
          padding: "8px",
          position: "relative",
          borderRadius: "4px",
          background: `linear-gradient(to right, ${theme.colors.orange[5]}, ${theme.colors.yellow[5]})`,
        })}
      >
        <Card>
          <SimpleGrid
            spacing={"md"}
            breakpoints={[
              { minWidth: "sm", cols: 1 },
              { minWidth: "md", cols: 3 },
            ]}
          >
            <Box>
              <Text>Current Pick</Text>
            </Box>
            <Box>
              <Text>Active</Text>
            </Box>
            <Box>
              <Text>Streak</Text>
            </Box>
          </SimpleGrid>
        </Card>
      </Box>
      <Card>Pick History TODO</Card>
    </Box>
  );
};
export default Team;
