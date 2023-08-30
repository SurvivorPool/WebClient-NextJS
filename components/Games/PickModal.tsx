import { Box, Button, Flex, Modal, Text, Title } from "@mantine/core";

import { FC } from "react";
import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import useMakePick from "@/hooks/useMakePick";

interface PickModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerTeamId: string;
  pickInfo: {
    gameId: number;
    teamName: string;
    teamAbbrev: string;
  };
}

const PickModal: FC<PickModalProps> = ({
  isOpen,
  onClose,
  pickInfo,
  playerTeamId,
}) => {
  const { mutate, isLoading } = useMakePick();

  const onConfirmClick = () => {
    notifications.show({
      id: "make-pick",
      loading: true,
      title: "Saving your pick",
      message: "Please wait while we save your pick.",
      autoClose: false,
      withCloseButton: false,
    });
    onClose();
    mutate(
      {
        playerTeamId,
        gameId: pickInfo?.gameId,
        nflTeamName: pickInfo?.teamName,
      },
      {
        onSuccess: () => {
          notifications.update({
            id: "make-pick",
            title: "Team Picked",
            color: "green",
            message: `Your pick for ${pickInfo?.teamName} has been saved.`,
            icon: <IconCheck size="1rem" />,
            autoClose: 2000,
          });
        },
      }
    );
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Make a pick">
      {pickInfo && (
        <Flex
          direction="column"
          justify="space-between"
          sx={{
            height: "160px",
          }}
        >
          <Box>
            <Title>
              {pickInfo.teamName} ({pickInfo.teamAbbrev})
            </Title>
            <Text>Are you sure want to pick this team?</Text>
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
            <Button disabled={isLoading} onClick={onConfirmClick}>
              Confirm
            </Button>
            <Button disabled={isLoading} variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      )}
    </Modal>
  );
};

export default PickModal;
