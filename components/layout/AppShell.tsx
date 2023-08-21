import {
  Box,
  Burger,
  Container,
  Header,
  AppShell as MantineAppShell,
  MediaQuery,
  Title,
} from "@mantine/core";
import { FC, ReactNode, useState } from "react";

import Nav from "./Nav";
import Profile from "./Profile";

interface AppShellProps {
  children: ReactNode;
}

const AppShell: FC<AppShellProps> = ({ children }) => {
  const [isBurgerOpened, setBurgerOpened] = useState(false);

  return (
    <MantineAppShell
      padding="md"
      navbar={
        <Nav hidden={!isBurgerOpened} setBurgerOpened={setBurgerOpened} />
      }
      header={
        <Header
          height={60}
          p="xs"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
            <Burger
              opened={isBurgerOpened}
              onClick={() => setBurgerOpened(!isBurgerOpened)}
              size="sm"
              sx={{
                marginRight: "16px",
              }}
            />
          </MediaQuery>
          <MediaQuery
            largerThan={"xs"}
            styles={{
              marginLeft: "16px",
            }}
          >
            <Box>
              <Title
                variant="gradient"
                gradient={{ from: "#FDC37B", to: "#C1582D", deg: 45 }}
                order={1}
                sx={{
                  fontFamily: "HappyFox",
                  letterSpacing: "2px",
                }}
                className="HappyFox"
              >
                SurvivorPool
              </Title>
            </Box>
          </MediaQuery>
          <Box
            sx={{
              marginRight: "16px",
            }}
          >
            <Profile />
          </Box>
        </Header>
      }
      navbarOffsetBreakpoint="sm"
      sx={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container
        size="xl"
        sx={{
          marginTop: "24px",
        }}
      >
        {children}
      </Container>
    </MantineAppShell>
  );
};

export default AppShell;
