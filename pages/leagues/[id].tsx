import {
  Box,
  Button,
  Card,
  Divider,
  Loader,
  SimpleGrid,
  Text,
  Title,
  Transition,
} from "@mantine/core";

import AddTeam from "@/components/Teams/AddTeam";
import Info from "@/components/Leagues/Info";
import Teams from "@/components/Leagues/Teams";
import { currencyFormatter } from "@/utils/formatters";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useGetLeaguesById from "@/hooks/useGetLeagueById";
import { useRouter } from "next/router";
import { useState } from "react";

const Leagues = () => {
  useAuthRedirect();
  const router = useRouter();
  const [isAddingTeam, setIsAddingTeam] = useState(false);
  const { data, isLoading, error } = useGetLeaguesById(
    router.query.id as string
  );

  const onBackClick = () => {
    router.push("/leagues");
  };

  const onJoinClick = () => {
    setIsAddingTeam(true);
  };

  const onCancelClick = () => {
    setIsAddingTeam(false);
  };

  if (isLoading) return <Loader />;

  const displayPrice =
    (data.league_type as unknown as string) === "free"
      ? "Free"
      : currencyFormatter.format(data.price);

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
        <Box>
          <Title order={2}>{data.name}</Title>
          <Text>{data.description}</Text>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            justifyContent: "flex-end",
          }}
        >
          {!data.signup_active && (
            <Button onClick={onJoinClick} disabled={isAddingTeam}>
              Join League
            </Button>
          )}
          <Button variant="outline" onClick={onBackClick}>
            Go Back
          </Button>
        </Box>
      </SimpleGrid>
      <Divider my={"16px"} />
      <Transition
        mounted={isAddingTeam}
        transition="slide-up"
        duration={350}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <AddTeam leagueId={data.id} onCancelClick={onCancelClick} />
          </div>
        )}
      </Transition>
      <Card
        padding={"xl"}
        sx={{
          backgroundImage: `linear-gradient(-60deg, #FDC37B
           0%, #C1582D 100%)`,
        }}
      >
        <SimpleGrid
          spacing={"md"}
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 3 },
          ]}
        >
          <Info label="Status" value={"In Progress"} />
          <Info
            label="Current Pot"
            value={currencyFormatter.format(data.pot)}
          />
          <Info label="Buy-In" value={displayPrice} />
        </SimpleGrid>
      </Card>
      <Teams teams={data.teams} />
    </Box>
  );
};

export default Leagues;
