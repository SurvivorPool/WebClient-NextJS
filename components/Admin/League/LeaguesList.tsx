import { Box, Loader, ScrollArea, Table, Text } from "@mantine/core";

import { FC } from "react";
import { League } from "@/types";
import Link from "next/link";

interface LeaguesListProps {
  leagues: Array<League>;
  isLoading: boolean;
}

const LeaguesList: FC<LeaguesListProps> = ({ leagues, isLoading }) => {
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

  return (
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
          {leagues.map((league) => (
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
  );
};

export default LeaguesList;
