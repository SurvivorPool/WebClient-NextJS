import {
  Box,
  Button,
  Card,
  CloseButton,
  TextInput,
  Title,
} from "@mantine/core";
import { ChangeEvent, FC, useCallback, useState } from "react";

import useCreateTeam from "@/hooks/useCreateTeam";

interface AddTeamProps {
  leagueId: string;
  onCancelClick: () => void;
  onAddTeam: () => void;
}

const AddTeam: FC<AddTeamProps> = ({ leagueId, onCancelClick, onAddTeam }) => {
  const { mutate } = useCreateTeam();
  const [teamName, setTeamName] = useState("");

  const onTeamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.currentTarget.value);
  };

  const onCreateClick = useCallback(async () => {
    mutate(
      {
        leagueId,
        teamName,
      },
      {
        onSuccess: () => {
          setTeamName("");
          onAddTeam();
        },
      }
    );
  }, [leagueId, teamName, mutate, onAddTeam]);

  return (
    <Card shadow="sm" padding={"xl"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Title order={4}>Create a Team</Title>
        <CloseButton size={"md"} onClick={onCancelClick} />
      </Box>
      <Box
        sx={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextInput
          placeholder="The best team ever"
          description="Your team name will be displayed to all users"
          label={"Team Name"}
          required
          value={teamName}
          onChange={onTeamNameChange}
          sx={{
            maxWidth: "550px",
          }}
        />
        <Box w={140}>
          <Button
            onClick={onCreateClick}
            fullWidth
            disabled={teamName?.length <= 5}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default AddTeam;
