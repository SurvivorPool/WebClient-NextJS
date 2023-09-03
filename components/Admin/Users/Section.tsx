import { Divider, Flex, Title } from "@mantine/core";

import UsersList from "./UsersList";

const Section = () => {
  return (
    <Flex direction={"column"} gap={"16px"}>
      <Title order={4}>Users Tools</Title>
      <Divider />
      <UsersList />
    </Flex>
  );
};

export default Section;
