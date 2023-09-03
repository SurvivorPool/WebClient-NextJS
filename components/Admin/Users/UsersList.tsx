// @ts-nocheck

import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { FC, useMemo, useState } from "react";

import Search from "@/components/Common/Search";
import useAdminUser from "@/hooks/useAdminUser";

const Users: FC = ({ users, isLoading }) => {
  if (isLoading) {
    return <Skeleton height="200" />;
  }

  if (!users) {
    return (
      <Box>
        <Text>No users found...</Text>
      </Box>
    );
  }

  return (
    <ScrollArea h={300}>
      <Table
        fontSize={"xs"}
        sx={{
          maxHeight: "700px",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>
                <b>{user.full_name}</b>
              </td>
              <td>{user.email}</td>
              <td>{user.wins}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

const UsersList = () => {
  const {
    users: { data, isLoading },
  } = useAdminUser();
  const [searchTerm, setSearchTerm] = useState("");

  const onClear = () => {
    setSearchTerm("");
  };

  const onSearchInput = (value: string) => {
    setSearchTerm(value);
  };

  const usersToRender = useMemo(() => {
    if (!data?.users) {
      return [];
    }

    return data.users.filter((user: any) => {
      return user.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm]);

  return (
    <Flex direction={"column"}>
      <Search
        searchTerm={searchTerm}
        onSearch={onSearchInput}
        onClear={onClear}
      />
      <Users users={usersToRender} isLoading={isLoading} />
    </Flex>
  );
};

export default UsersList;
