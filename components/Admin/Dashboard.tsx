import { Card, Tabs, Title } from "@mantine/core";
import {
  IconBallAmericanFootball,
  IconCalendarTime,
  IconShirtSport,
  IconUsers,
} from "@tabler/icons-react";

import LeagueSection from "./League/Section";
import PlayerTeamSection from "./PlayerTeams/Section";
import { useMediaQuery } from "@mantine/hooks";

const Dashboard = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Tabs
      defaultValue="league"
      orientation={isMobile ? "horizontal" : "vertical"}
    >
      <Tabs.List pr={"8px"}>
        <Tabs.Tab value="league" icon={<IconBallAmericanFootball size={12} />}>
          <Title order={6}>League</Title>
        </Tabs.Tab>
        <Tabs.Tab value="playerteam" icon={<IconShirtSport size={12} />}>
          <Title order={6}>Player Teams</Title>
        </Tabs.Tab>
        <Tabs.Tab value="users" icon={<IconUsers size={12} />}>
          <Title order={6}>Users</Title>
        </Tabs.Tab>
        <Tabs.Tab value="advance" icon={<IconCalendarTime size={12} />}>
          <Title order={6}>Advance Week</Title>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="league">
        <Card>
          <LeagueSection />
        </Card>
      </Tabs.Panel>
      <Tabs.Panel value="playerteam">
        <Card>
          <PlayerTeamSection />
        </Card>
      </Tabs.Panel>
      <Tabs.Panel value="users">
        <Card>Users</Card>
      </Tabs.Panel>
      <Tabs.Panel value="advance">
        <Card>Advance</Card>
      </Tabs.Panel>
    </Tabs>
  );
};

export default Dashboard;
