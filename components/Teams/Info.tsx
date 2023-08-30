import { Box, Card, Flex, SimpleGrid, Text } from "@mantine/core";

import { FC } from "react";

interface InfoProps {
  currentPick: string;
  active: boolean;
  streak: number;
  paid: boolean;
}

const Info: FC<InfoProps> = ({ currentPick, active, streak, paid }) => {
  return (
    <Box
      sx={(theme) => ({
        padding: "24px",
        position: "relative",
        borderRadius: "4px",
        background: `linear-gradient(to right, ${theme.colors.orange[5]}, ${theme.colors.yellow[5]})`,
      })}
    >
      <Card padding="xl">
        <SimpleGrid
          spacing={"md"}
          cols={2}
          breakpoints={[{ minWidth: "md", cols: 4 }]}
        >
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Text
              fz={"sm"}
              sx={(theme) => ({
                fontWeight: 800,
                color: theme.colors.gray[5],
              })}
            >
              Current Pick
            </Text>
            <Text fz="xl">{currentPick ? currentPick : "No Pick Yet"}</Text>
          </Flex>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Text
              fz={"sm"}
              sx={(theme) => ({
                fontWeight: 800,
                color: theme.colors.gray[5],
              })}
            >
              Status
            </Text>
            <Text fz="xl" color={active ? "green" : "red"}>
              {active ? "Active" : "Inactive"}
            </Text>
          </Flex>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Text
              fz={"sm"}
              sx={(theme) => ({
                fontWeight: 800,
                color: theme.colors.gray[5],
              })}
            >
              Paid Up
            </Text>
            <Text fz="xl" color={paid ? "green" : "red"}>
              {paid ? "All Paid" : "Payment Due"}
            </Text>
          </Flex>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Text
              fz={"sm"}
              sx={(theme) => ({
                fontWeight: 800,
                color: theme.colors.gray[5],
              })}
            >
              Win Streak
            </Text>
            <Text fz="xl">{streak}</Text>
          </Flex>
        </SimpleGrid>
      </Card>
    </Box>
  );
};

export default Info;
