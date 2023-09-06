import {
  ActionIcon,
  Button,
  Card,
  Flex,
  TextInput,
  Title,
  Tooltip,
  Transition,
} from "@mantine/core";
import { ChangeEvent, FC, useState } from "react";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";

import { notifications } from "@mantine/notifications";
import useUpdateTeamName from "@/hooks/useUpdateTeamName";

interface EditTeamNameProps {
  canEdit: boolean;
  teamId: string;
  currentTeamName: string;
  onEditTeamName: () => void;
}

const EditTeamName: FC<EditTeamNameProps> = ({
  canEdit = false,
  teamId,
  currentTeamName,
  onEditTeamName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [teamName, setTeamName] = useState(currentTeamName);
  const updateTeamName = useUpdateTeamName(teamId);

  const onSave = async () => {
    notifications.show({
      id: "edit-teamname",
      loading: true,
      title: "Updating your team",
      message: "Please wait while we rename your team.",
      autoClose: false,
      withCloseButton: false,
    });
    await updateTeamName.mutateAsync(teamName, {
      onSuccess: () => {
        notifications.update({
          id: "edit-teamname",
          color: "green",
          title: "Team Name Updated",
          message: `"${currentTeamName}" has now been renamed "${teamName}".`,
          icon: <IconCheck size="1rem" />,
          autoClose: 2000,
        });
        onEditTeamName();
        setIsEditing(false);
      },
    });
  };

  const onTeamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const onEditCancel = () => {
    setTeamName(currentTeamName);
    setIsEditing(false);
  };

  return (
    <Flex direction="column" gap="16px">
      <Flex gap="8px">
        <Title order={2}>{currentTeamName}</Title>
        {canEdit ? (
          <Tooltip label="Edit your team name">
            <ActionIcon
              onClick={() => setIsEditing(true)}
              sx={{
                padding: "4px",
              }}
            >
              <IconEdit size="18px" />
            </ActionIcon>
          </Tooltip>
        ) : null}
      </Flex>
      <Transition
        mounted={isEditing}
        transition="slide-up"
        duration={350}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Card
              sx={{
                position: "relative",
              }}
            >
              <TextInput
                value={teamName}
                onChange={onTeamNameChange}
                label={"Edit Team Name"}
                placeholder="Must be at least 3 characters."
                rightSection={
                  <Button
                    disabled={
                      !teamName?.length ||
                      teamName?.length < 4 ||
                      teamName === currentTeamName
                    }
                    onClick={onSave}
                  >
                    Save
                  </Button>
                }
              />
              <ActionIcon
                onClick={onEditCancel}
                sx={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                }}
              >
                <IconX />
              </ActionIcon>
            </Card>
          </div>
        )}
      </Transition>
    </Flex>
  );
};

export default EditTeamName;
