import { Button, Code, CopyButton, Flex, ScrollArea } from "@mantine/core";

import { FC } from "react";

interface OutputProps {
  output: string;
}

const Output: FC<OutputProps> = ({ output }) => (
  <Flex direction={"column"} gap={"16px"}>
    <Flex justify={"flex-end"}>
      <CopyButton value={output}>
        {({ copied, copy }) => (
          <Button w={200} color={copied ? "teal" : "blue"} onClick={copy}>
            {copied ? "Copied" : "Copy Output"}
          </Button>
        )}
      </CopyButton>
    </Flex>
    <ScrollArea mah={500}>
      <Code block>{output}</Code>
    </ScrollArea>
  </Flex>
);

export default Output;
