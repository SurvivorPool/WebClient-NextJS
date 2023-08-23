import {
  Box,
  Container,
  Header,
  AppShell as MantineAppShell,
  MediaQuery,
  Title,
} from "@mantine/core";
import { FC, ReactNode, useState } from "react";

import LandingFooter from "./LandingFooter";
import Profile from "./Profile";

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout: FC<LandingLayoutProps> = ({ children }) => {
  const [isBurgerOpened, setBurgerOpened] = useState(false);

  return (
    <>
      <MantineAppShell
        padding="md"
        header={
          <Header
            height={60}
            p="xs"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              background: "transparent",
              borderBottom: "none",
            }}
          >
            <Box
              sx={{
                marginLeft: "16px",
              }}
            >
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
            height: "calc(100% - 60px)",
          }}
        >
          {children}
        </Container>
      </MantineAppShell>
      <LandingFooter />
    </>
  );
};

export default LandingLayout;
