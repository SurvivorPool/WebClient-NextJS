import { Box, Loader, ScrollArea, Table, Text } from "@mantine/core";
import { FC, useMemo, useState } from "react";

import { League } from "@/types";
import Link from "next/link";
import Search from "@/components/Common/Search";

interface LeaguesListProps {
  leagues: Array<League>;
  isLoading: boolean;
}

const LeaguesList: FC<LeaguesListProps> = ({ leagues, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const leaguesToRender = useMemo(() => {
    if (!searchTerm) {
      return leagues;
    }
    if (!leagues) {
      return [];
    }

    return leagues.filter((league: League) => {
      return (
        league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        league.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, leagues]);

  if (isLoading) {
    return <Loader />;
  }

  if (!leagues?.length) {
    return (
      <Box>
        <Text>No leagues found...</Text>
      </Box>
    );
  }

  const onSearchInput = (value: string) => {
    setSearchTerm(value);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  return (
    <>
      <Search
        searchTerm={searchTerm}
        onSearch={onSearchInput}
        onClear={onClear}
      />
      <ScrollArea h={300}>
        <Table fontSize="xs">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Joinable</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {leaguesToRender.map((league) => (
              <tr key={league.id}>
                <td>
                  <Link href={`/leagues/${league.id}`}>View League</Link>
                </td>
                <td>
                  <b>{league.name}</b>
                </td>
                <td>{league.description}</td>
                <td>{league.price}</td>
                <td>{league.signup_active ? "Open" : "Closed"}</td>
                <td>{league.completed ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default LeaguesList;
