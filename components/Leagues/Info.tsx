import { Card, Text } from "@mantine/core";

import { FC } from "react";

interface InfoProps {
  value: number | string;
  label: string;
}

const Info: FC<InfoProps> = ({ label, value }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text
      fz={"sm"}
      sx={(theme) => ({
        fontWeight: 800,
        color: "rgb(134, 142, 150)",
      })}
    >
      {label}
    </Text>
    <Text fz={"xl"}>{value}</Text>
  </Card>
);

export default Info;
