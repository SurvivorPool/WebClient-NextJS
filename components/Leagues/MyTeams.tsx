import { Box, Card, Table, Text, Title, useMantineTheme } from "@mantine/core";
import { FC, useMemo } from "react";

import Link from "next/link";
import { Team } from "@/types";

interface MyTeamsProps {
  teams: Array<Team>;
}

const MyTeams: FC<MyTeamsProps> = ({ teams }) => {
  const theme = useMantineTheme();
  const rows = useMemo(() => {
    return teams.map((team) => (
      <tr
        key={team.id}
        style={{
          backgroundColor: !team.active ? theme.colors.red[1] : "transparent",
        }}
      >
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
              <b>{team.name}</b>
            </Text>
          </Link>
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
        <td>{team.current_pick}</td>
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
              <th>Name</th>
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
