import {
  Box,
  Card,
  MediaQuery,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { FC, useMemo } from "react";

import Avatar from "../Common/Avatar";
import { IconInfoCircle } from "@tabler/icons-react";
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Avatar name={team.user.full_name[0]} />
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
          {!team?.current_pick ? (
            <td>
              <Tooltip label="Other players' picks will be revealed when their game begins.">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <IconInfoCircle size="18" color="#868e96" />
                  <Text fz="small" color="dimmed">
                    Unavailable
                  </Text>
                </Box>
              </Tooltip>
            </td>
          ) : (
            <td>{team.current_pick}</td>
          )}
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
