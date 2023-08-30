import { Box, Button, Divider, Flex, Title } from "@mantine/core";
import { IconCheck, IconExclamationMark } from "@tabler/icons-react";

import Output from "./Output";
import { notifications } from "@mantine/notifications";
import useAdminAdvanceWeek from "@/hooks/useAdminAdvanceWeek";
import { useState } from "react";

const Section = () => {
  const [isAdvancing, setIsAdvancing] = useState(false);
  const { mutate, isLoading } = useAdminAdvanceWeek();
  const [output, setOutput] = useState("");

  const onAdvanceClick = () => {
    setIsAdvancing(true);
  };

  const onConfirmClick = async () => {
    notifications.show({
      id: "advance-week",
      loading: true,
      title: "Advancing Week",
      message: "Please wait while we advance the week.",
      autoClose: false,
      withCloseButton: false,
    });
    await mutate(undefined, {
      onSuccess: (data) => {
        setOutput(JSON.stringify(data, null, 2));
        notifications.update({
          id: "advance-week",
          title: "Success",
          message: "Week advanced",
          color: "green",
          icon: <IconCheck size="1rem" />,
          autoClose: 2000,
        });
        setIsAdvancing(false);
      },
      onError: (error) => {
        // @ts-ignore
        setOutput(JSON.stringify(error.message, null, 2));
        notifications.hide("advance-week");
        setIsAdvancing(false);
      },
    });
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <Title order={4}>Advance Week</Title>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <Button
          color={isAdvancing ? "red" : "orange"}
          loading={isLoading}
          onClick={!isAdvancing ? onAdvanceClick : onConfirmClick}
        >
          {isAdvancing ? "Confirm Advance" : "Advance Week"}
        </Button>
      </Box>
      {output && <Output output={output} />}
    </Flex>
  );
};

export default Section;
