import { Box, Header, AppShell as MantineAppShell, Title } from "@mantine/core";
import { FC, ReactNode } from "react";

import Profile from "./Profile";

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout: FC<LandingLayoutProps> = ({ children }) => (
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
          />
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
      {children}
    </MantineAppShell>
  </>
);

export default LandingLayout;
