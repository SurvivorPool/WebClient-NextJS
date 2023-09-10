import { Box, Card, Table, Text, Title } from "@mantine/core";
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
          <Link href={`/team/${team.id}`}>
            <Text
              sx={({ colors }) => ({
                color: colors.orange[5],

                "&:hover": {
                  color: colors.red[4],
                },
              })}
            >
              View Team
            </Text>
          </Link>
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
          <td>
              {team.current_pick}
          </td>
      </tr>
    ));
  }, [teams]);

  return (
    <Card>
      <Title order={3}>My Teams</Title>
      {!!teams?.length ? (
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
            You're not registered for this league yet. Click Join League above
            to compete!
          </Text>
        </Box>
      )}
    </Card>
  );
};

export default MyTeams;
