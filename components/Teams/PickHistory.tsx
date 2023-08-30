import { Box, Card, Text, Timeline, Title } from "@mantine/core";

import { FC } from "react";

interface PickHistoryProps {
  pickHistory: any[];
  currentPick?: string;
}

const PickHistory: FC<PickHistoryProps> = ({ pickHistory, currentPick }) => {
  return (
    <Card>
      <Title order={4}>Pick History</Title>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "300px",
        }}
      >
        {pickHistory?.length ? (
          <Timeline
            active={pickHistory?.length - 1}
            bulletSize={24}
            lineWidth={7}
          >
            {pickHistory.map((pick) => (
              <Timeline.Item key={pick.id}>
                <Box h="50px">
                  <Text>{pick.nfl_team_name}</Text>
                </Box>
              </Timeline.Item>
            ))}
            {currentPick && (
              <Timeline.Item>
                <Box h="50px">
                  <Text>{currentPick}</Text>
                </Box>
              </Timeline.Item>
            )}
          </Timeline>
        ) : (
          <>
            <Text fz="xl">No history yet</Text>
            <Text fz="xs">Check back later</Text>
          </>
        )}
      </Box>
    </Card>
  );
};

export default PickHistory;
