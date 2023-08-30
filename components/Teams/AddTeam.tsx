import {
  Box,
  Button,
  Card,
  CloseButton,
  TextInput,
  Title,
} from "@mantine/core";
import { ChangeEvent, FC, useCallback, useState } from "react";

import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import useCreateTeam from "@/hooks/useCreateTeam";

interface AddTeamProps {
  leagueId: string;
  onCancelClick: () => void;
  onAddTeam: () => void;
}

const AddTeam: FC<AddTeamProps> = ({ leagueId, onCancelClick, onAddTeam }) => {
  const { mutate, isLoading } = useCreateTeam();
  const [teamName, setTeamName] = useState("");

  const onTeamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.currentTarget.value);
  };

  const onCreateClick = useCallback(async () => {
    notifications.show({
      id: "add-team",
      loading: true,
      title: "Creating your team",
      message: "Please wait while we create your team.",
      autoClose: false,
      withCloseButton: false,
    });
    mutate(
      {
        leagueId,
        teamName,
      },
      {
        onSuccess: () => {
          notifications.update({
            id: "add-team",
            color: "green",
            title: "Team Created",
            message: `${teamName} has been created successfully. Good luck!`,
            icon: <IconCheck size="1rem" />,
            autoClose: 2000,
          });
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
            disabled={teamName?.length <= 5 || isLoading}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default AddTeam;
