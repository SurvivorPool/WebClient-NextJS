import { Box, Button, Flex, Skeleton, Table, Text, Title } from "@mantine/core";
import { FC, useState } from "react";

import EditModal from "./EditModal";
import { Team } from "@/types";
import useAdminPlayerTeam from "@/hooks/useAdminPlayerTeam";

interface TeamsProps {
  teams: Array<Team>;
  isLoading: boolean;
  onEditClick: (team: Team) => void;
}

const Teams: FC<TeamsProps> = ({ teams, isLoading, onEditClick }) => {
  if (isLoading) {
    return <Skeleton height="200" />;
  }

  if (!teams) {
    return (
      <Box>
        <Text>No teams found...</Text>
      </Box>
    );
  }

  return (
    <Table
      fontSize={"xs"}
      sx={{
        maxHeight: "700px",
      }}
    >
      <thead>
        <tr>
          <th>Team</th>
          <th>Coach</th>
          <th>League</th>
          <th>Paid</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <tr key={team.id}>
            <td>
              <b>{team.name}</b>
            </td>
            <td>{team.user.full_name}</td>
            <td>{team.league.name}</td>
            <td>{team.paid ? "Paid" : "Unpaid"}</td>
            <td>
              <Button onClick={() => onEditClick(team)}>Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const PlayerTeamsList = () => {
  const [editTeamInfo, setEditTeamInfo] = useState<Team | null>(null);
  const {
    playerTeams: { data, isLoading, refetch },
  } = useAdminPlayerTeam();

  const onEditClick = (team: Team) => {
    setEditTeamInfo(team);
  };

  const onModalClose = () => {
    setEditTeamInfo(null);
  };

  const onEdit = () => {
    refetch();
  };

  return (
    <Flex direction={"column"}>
      <Title>Player Teams</Title>
      <Teams
        teams={data?.teams || []}
        isLoading={isLoading}
        onEditClick={onEditClick}
      />
      <EditModal
        isOpen={!!editTeamInfo}
        onClose={onModalClose}
        team={editTeamInfo}
        onEdit={onEdit}
      />
    </Flex>
  );
};

export default PlayerTeamsList;
