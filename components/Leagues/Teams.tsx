import {
  Avatar,
  Box,
  Card,
  MediaQuery,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { FC, useMemo } from "react";

import Link from "next/link";
import { Team } from "@/types";

interface TeamsProps {
  teams: Array<Team>;
}

const Teams: FC<TeamsProps> = ({ teams }) => {
  const rows = useMemo(() => {
    return teams.map((team) => (
      <tr key={team.id}>
        <td>
          <Link href={`/team/${team.id}`}>View Team</Link>
        </td>
        <td>
          <b>{team.name}</b>
        </td>
        <td>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Avatar radius="xl">{team.user.full_name[0].toUpperCase()}</Avatar>
            <Text fz="sm">{team.user.full_name}</Text>
          </Box>
        </td>
        <td>
          {team.active ? (
            <Text fz="sm" color="green">
              Active
            </Text>
          ) : (
            <Text fz="sm" color="red">
              Inactive
            </Text>
          )}
        </td>
        <MediaQuery
          smallerThan={"sm"}
          styles={{
            display: "none",
          }}
        >
          <td>{team.current_pick}</td>
        </MediaQuery>
      </tr>
    ));
  }, [teams]);

  return (
    <Card>
      <Title order={3}>Other Registered Teams</Title>
      {!!teams?.length ? (
        <Table fontSize={"xs"}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Coach</th>
              <th>Status</th>
              <MediaQuery
                smallerThan={"sm"}
                styles={{
                  display: "none",
                }}
              >
                <th>Current Pick</th>
              </MediaQuery>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : (
        <Box
          sx={{
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text c="dimmed" size="lg">
            No one else has registered for this league yet.
          </Text>
        </Box>
      )}
    </Card>
  );
};

export default Teams;
