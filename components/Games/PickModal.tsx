import { Box, Button, Flex, Modal, Text, Title } from "@mantine/core";

import { FC } from "react";
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
  const { mutate } = useMakePick();

  const onConfirmClick = () => {
    mutate(
      {
        playerTeamId,
        gameId: pickInfo?.gameId,
        nflTeamName: pickInfo?.teamName,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Make a pick">
      {pickInfo && (
        <Box>
          <Title>
            {pickInfo.teamName} ({pickInfo.teamAbbrev})
          </Title>
          <Text>Are you sure want to pick this team?</Text>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: "sm", sm: "lg" }}
            sx={{
              padding: "8px",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Button onClick={onConfirmClick}>Confirm</Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </Box>
      )}
    </Modal>
  );
};

export default PickModal;
