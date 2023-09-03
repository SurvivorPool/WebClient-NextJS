import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { FC, useMemo, useState } from "react";

import EditModal from "./EditModal";
import Search from "@/components/Common/Search";
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
    <ScrollArea h={300}>
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
    </ScrollArea>
  );
};

const PlayerTeamsList = () => {
  const [editTeamInfo, setEditTeamInfo] = useState<Team | null>(null);
  const {
    playerTeams: { data, isLoading, refetch },
  } = useAdminPlayerTeam();
  const [searchTerm, setSearchTerm] = useState("");

  const onEditClick = (team: Team) => {
    setEditTeamInfo(team);
  };

  const onModalClose = () => {
    setEditTeamInfo(null);
  };

  const onEdit = () => {
    refetch();
  };

  const onClear = () => {
    setSearchTerm("");
  };

  const onSearchInput = (value: string) => {
    setSearchTerm(value);
  };

  const teamsToRender = useMemo(() => {
    if (!data?.teams) {
      return [];
    }

    return data.teams.filter((team: Team) => {
      return (
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchTerm]);

  return (
    <Flex direction={"column"}>
      <Search
        searchTerm={searchTerm}
        onSearch={onSearchInput}
        onClear={onClear}
      />
      <Teams
        teams={teamsToRender}
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
