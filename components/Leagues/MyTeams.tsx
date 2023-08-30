import { Card, Table, Text, Title } from "@mantine/core";
import { FC, useMemo } from "react";

import Link from "next/link";
import { Team } from "@/types";

interface MyTeamsProps {
  teams: Array<Team>;
}

const MyTeams: FC<MyTeamsProps> = ({ teams }) => {
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
          {team.active ? (
            <Text size="md" color="green">
              Active
            </Text>
          ) : (
            <Text color="red" size="md">
              Inactive
            </Text>
          )}
        </td>
        <td>
          {team.paid ? (
            <Text size="md">Paid</Text>
          ) : (
            <Text color="red" size="md">
              Payment Due
            </Text>
          )}
        </td>
        {!team.current_pick ? (
          <td>
            <Text size="md" color="red">
              Make a pick soon
            </Text>
          </td>
        ) : (
          <td>{team.current_pick}</td>
        )}
      </tr>
    ));
  }, [teams]);

  return (
    <Card>
      <Title order={3}>My Teams</Title>
      <Table fontSize={"xs"}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Status</th>
            <th>Paid Up</th>
            <th>Current Pick</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};

export default MyTeams;
