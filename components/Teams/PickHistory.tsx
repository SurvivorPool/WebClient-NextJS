import { Box, Card, Text, Timeline, Title } from "@mantine/core";
import { FC, useMemo } from "react";
import { PickHistory } from "@/types";
import { IconX, IconCheck } from "@tabler/icons-react";

const TimelineContent = ({ week }: { week: number }) => (
  <Text c="dimmed" fz={"xs"}>{`Week ${week}`}</Text>
);
interface PickHistoryProps {
  pickHistory: Array<PickHistory>;
  currentPick?: string;
  isActive: boolean;
}

const PickHistory: FC<PickHistoryProps> = ({
  pickHistory,
  currentPick,
  isActive,
}) => {
  const rows = useMemo(() => {
    const history = pickHistory.map((pick, index, arr) => {
      const isLastPick = index === arr.length - 1;
      return (
        <Timeline.Item
          key={pick.id}
          title={pick.nfl_team_name}
          lineVariant={isLastPick ? "dashed" : "solid"}
          h={50}
          color={!isActive && isLastPick ? "red" : "green"}
          bullet={
            !isActive && isLastPick ? (
              <IconX size={20} />
            ) : (
              <IconCheck size={20} />
            )
          }
        >
          <TimelineContent week={index + 1} />
        </Timeline.Item>
      );
    });

    if (currentPick) {
      history.push(
        <Timeline.Item key={currentPick} title={currentPick} h={50}>
          <TimelineContent week={pickHistory.length + 1} />
        </Timeline.Item>
      );
    } else if (isActive) {
      history.push(
        <Timeline.Item
          key={"No Pick"}
          title={"No current pick"}
          color="gray"
          h={50}
        >
          <TimelineContent week={pickHistory.length + 1} />
        </Timeline.Item>
      );
    }

    return history;
  }, [pickHistory]);
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
            lineWidth={2}
            bulletSize={26}
            active={pickHistory.length - 1}
          >
            {rows}
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
