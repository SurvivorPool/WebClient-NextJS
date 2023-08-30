import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { ChangeEvent, FC, useState } from "react";

import { Team } from "@/types";
import { notifications } from "@mantine/notifications";
import useAdminPlayerTeam from "@/hooks/useAdminPlayerTeam";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  team: Team | null;
}

const EditModal: FC<EditModalProps> = ({ isOpen, onClose, team, onEdit }) => {
  const [isActive, setIsActive] = useState(team?.active || false);
  const [isPaid, setIsPaid] = useState(team?.paid || false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updatePlayerTeam, deletePlayerTeam } = useAdminPlayerTeam();

  const onUpdateClick = async () => {
    updatePlayerTeam.mutate(
      {
        id: team?.id || "",
        active: isActive,
        paid: isPaid,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "Team Updated",
            message: `${team?.name || ""} has been updated successfully.`,
            color: "green",
          });
          onEdit();
          onCloseClick();
        },
      }
    );
  };

  const onPaidChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPaid(event.currentTarget.checked);
  };

  const onActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.currentTarget.checked);
  };

  const onDeleteClick = () => {
    setIsDeleting(true);
  };

  const onDeleteConfirmClick = async () => {
    deletePlayerTeam.mutate(
      {
        id: team?.id || "",
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "Team Deleted",
            message: `${team?.name || ""} has been deleted successfully.`,
            color: "green",
          });
          onEdit();
          onCloseClick();
        },
      }
    );
  };

  const onCloseClick = () => {
    setIsActive(team?.active || false);
    setIsPaid(team?.paid || false);
    setIsDeleting(false);
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onCloseClick} title="Edit Team" size="lg">
      {!!team ? (
        <Flex direction={"column"} gap={"16px"}>
          <Flex direction={"column"} gap={"8px"}>
            <Title order={2}>{team?.name}</Title>
            <Text color="dimmed">{team?.user?.full_name}</Text>
          </Flex>
          <Divider />
          <Flex direction={"column"} gap={"16px"}>
            <Switch label="Paid" checked={isPaid} onChange={onPaidChange} />
            <Switch
              label="Active"
              checked={isActive}
              onChange={onActiveChange}
            />
          </Flex>
          <Box
            sx={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              border: `1px solid ${isDeleting ? "red" : "transparent"}`,
            }}
          >
            <Text color="red" fw="bold" hidden={!isDeleting}>
              Are you sure you want to delete this team?
            </Text>
            <Button
              color="red"
              onClick={!isDeleting ? onDeleteClick : onDeleteConfirmClick}
            >
              {!isDeleting ? "Delete Team" : "Confirm Delete"}
            </Button>
          </Box>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: "sm", sm: "lg" }}
            sx={{
              padding: "8px",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Button onClick={onUpdateClick}>Update</Button>
            <Button variant="outline" onClick={onCloseClick}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      ) : null}
    </Modal>
  );
};

export default EditModal;
