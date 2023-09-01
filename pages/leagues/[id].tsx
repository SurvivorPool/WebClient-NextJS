// @ts-nocheck

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
import { useMemo, useState } from "react";

import AddTeam from "@/components/Teams/AddTeam";
import Info from "@/components/Common/Info";
import MyTeams from "@/components/Leagues/MyTeams";
import Teams from "@/components/Leagues/Teams";
import { currencyFormatter } from "@/utils/formatters";
import useGetLeaguesById from "@/hooks/useGetLeagueById";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Leagues = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isAddingTeam, setIsAddingTeam] = useState(false);
  const { data, isLoading, refetch } = useGetLeaguesById(
    router.query.id as string
  );

  const teams = useMemo(() => {
    const defaultTeams = {
      usersTeams: [],
      otherTeams: [],
    };

    if (!data || !session || isLoading) {
      return defaultTeams;
    }
    const userId = session?.user_id;

    if (!userId) {
      return defaultTeams;
    }

    return data?.teams?.reduce(
      (teamsAcc, team) => {
        if (team.user_id === userId) {
          teamsAcc.usersTeams.push(team);
        } else {
          teamsAcc.otherTeams.push(team);
        }

        return teamsAcc;
      },
      {
        usersTeams: [],
        otherTeams: [],
      }
    );
  }, [data, session, isLoading]);

  const onBackClick = () => {
    router.push("/leagues");
  };

  const onJoinClick = () => {
    setIsAddingTeam(true);
  };

  const onCancelClick = () => {
    setIsAddingTeam(false);
  };

  const onAddTeam = () => {
    refetch();
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
          {data.signup_active && (
            <Button onClick={onJoinClick} disabled={isAddingTeam}>
              Join League
            </Button>
          )}
          <Button variant="outline" onClick={onBackClick}>
            Back to Leagues
          </Button>
        </Box>
      </SimpleGrid>
      <Transition
        mounted={isAddingTeam}
        transition="slide-up"
        duration={350}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <AddTeam
              leagueId={data.id}
              onCancelClick={onCancelClick}
              onAddTeam={onAddTeam}
            />
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
      <Divider my={"16px"} />
      <MyTeams teams={teams.usersTeams} />
      <Teams teams={teams.otherTeams} />
    </Box>
  );
};

Leagues.auth = true;

export default Leagues;
