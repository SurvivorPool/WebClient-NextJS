// @ts-nocheck

import {
  Box,
  Button,
  Card,
  Divider,
  Loader,
  SimpleGrid,
  Text,
} from "@mantine/core";

import Avatar from "@/components/Common/Avatar";
import BreadCrumb from "@/components/Common/BreadCrumb";
import EditTeamName from "@/components/Teams/EditTeamName";
import Info from "@/components/Common/Info";
import PickHistory from "@/components/Teams/PickHistory";
import useGetTeamById from "@/hooks/useGetTeamById";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const mockPickHistory = [
  {
    id: "1",
    player_team_id: "1",
    nfl_team_name: "Rams",
    game_id: "1",
  },
  {
    id: "2",
    player_team_id: "1",
    nfl_team_name: "Dolphins",
    game_id: "2",
  },
  {
    id: "3",
    player_team_id: "1",
    nfl_team_name: "Bills",
    game_id: "3",
  },
  {
    id: "4",
    player_team_id: "1",
    nfl_team_name: "Raiders",
    game_id: "4",
  },
];

const Team = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    data,
    isLoading: getTeamByIdLoading,
    refetch,
  } = useGetTeamById(router.query.id as string);

  const isUsersTeam = useMemo(() => {
    if (!data || !session) return false;

    if (data.user_id === session.user_id) {
      return true;
    }

    return false;
  }, [session, data]);

  if (getTeamByIdLoading || status === "loading") return <Loader />;

  const crumbs = [
    {
      title: "Leagues",
      href: "/leagues",
    },
    {
      title: data.league?.name,
      href: `/leagues/${data.league_id}`,
    },
    {
      title: data.name,
      href: null,
    },
  ];

  const onLeagueClick = () => {
    router.push(`/leagues/${data.league_id}`);
  };

  const onPickClick = () => {
    router.push(`/games?team_id=${router.query.id}`);
  };

  const onEditTeamName = async () => {
    await refetch();
  };

  return (
    <>
      {!!data && <BreadCrumb items={crumbs} />}
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
            <EditTeamName
              canEdit={isUsersTeam}
              teamId={data.id}
              currentTeamName={data.name}
              onEditTeamName={onEditTeamName}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Avatar name={data.user.full_name[0]} />
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
            <Button
              sx={{
                display: isUsersTeam ? "block" : "none",
              }}
              onClick={onPickClick}
            >
              Make a Pick
            </Button>
            <Button variant="outline" onClick={onLeagueClick}>
              Go to League
            </Button>
          </Box>
        </SimpleGrid>
        <Divider />
        <Card
          padding={"xl"}
          sx={{
            backgroundImage: `linear-gradient(-60deg, #FDC37B
           0%, #C1582D 100%)`,
          }}
        >
          <SimpleGrid
            spacing={"md"}
            cols={2}
            breakpoints={[{ minWidth: "md", cols: 4 }]}
          >
            <Info
              label="Current Pick"
              value={data.current_pick || "No pick yet"}
            />
            <Info label="Status" value={data.active ? "Active" : "Inactive"} />
            <Info
              label="Paid Up"
              value={data.paid ? "All Paid" : "Payment Due"}
            />
            <Info
              label="Win Streak"
              value={data.streak ? data.streak : "No wins yet"}
            />
          </SimpleGrid>
        </Card>
        <PickHistory
          pickHistory={data.pick_history}
          //pickHistory={mockPickHistory}
          currentPick={data?.current_pick}
        />
      </Box>
    </>
  );
};

Team.auth = true;

export default Team;
