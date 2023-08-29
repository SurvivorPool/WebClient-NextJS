import { Box, Button, Navbar, Text } from "@mantine/core";
import { FC, ReactSVGElement, useMemo } from "react";
import {
  IconBackhoe,
  IconBallAmericanFootball,
  IconClipboardList,
  IconMessageDots,
  IconShirtSport,
} from "@tabler/icons-react";

import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import useIsAdmin from "@/hooks/useIsAdmin";
import { useRouter } from "next/router";

const links = [
  // {
  //   link: "/summary",
  //   label: "Summary",
  //   icon: <IconClipboardList color="#c1582d" strokeWidth={2} size={24} />,
  // },
  {
    link: "/leagues",
    label: "Leagues",
    icon: (
      <IconBallAmericanFootball color="#c1582d" strokeWidth={2} size={24} />
    ),
  },
  // {
  //   link: "/teams",
  //   label: "Teams",
  //   icon: <IconShirtSport color="#c1582d" strokeWidth={2} size={24} />,
  // },
  // {
  //   link: "/notifications",
  //   label: "Notifications",
  //   icon: <IconMessageDots color="#c1582d" strokeWidth={2} size={24} />,
  // },
];

const adminLinks = [
  {
    link: "/admin",
    label: "Admin Tools",
    icon: <IconBackhoe color="#c1582d" strokeWidth={2} size={24} />,
  },
];

interface NavLinkProps {
  href: string;
  label: string;
  setBurgerOpened: (value: boolean) => void;
  icon?: () => ReactSVGElement | null | undefined | React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
}

const NavLink: FC<NavLinkProps> = ({
  href,
  label,
  setBurgerOpened,
  icon = () => null,
  isActive = false,
  disabled = false,
}) => (
  <Button
    component={Link}
    href={href}
    disabled={disabled}
    onClick={() => setBurgerOpened(false)}
    sx={{
      borderRadius: "4px",
      textDecoration: "none",
      padding: "4px 8px",
      backgroundColor: isActive ? "rgba(0, 0, 0, 0.1)" : "transparent",
      height: "65px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",

      "&:hover": {
        backgroundColor: "rgba(193, 88, 45, 0.1)",
      },
    }}
  >
    <Box
      sx={{
        marginRight: "8px",
      }}
    >
      {icon()}
    </Box>
    <Text color="#c1582d">{label}</Text>
  </Button>
);

interface NavProps {
  hidden: boolean;
  setBurgerOpened: (value: boolean) => void;
}

const Nav: FC<NavProps> = ({ hidden, setBurgerOpened }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { data: isAdmin } = useIsAdmin();

  const linksToRender = useMemo(() => {
    if (isAdmin) {
      return [...links, ...adminLinks];
    }
    return links;
  }, [isAdmin]);

  return (
    <Navbar
      height={"100%"}
      p="xs"
      width={{ sm: 250, base: "100%" }}
      hiddenBreakpoint={"sm"}
      hidden={hidden}
    >
      <Box
        sx={{
          height: "calc(100% - 60px)", // Header Height
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <Navbar.Section
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {linksToRender.map(({ link, label, icon }) => (
              <NavLink
                key={link}
                href={link}
                label={label}
                icon={() => (icon ? icon : null)}
                isActive={currentPath.includes(link)}
                setBurgerOpened={setBurgerOpened}
              />
            ))}
          </Navbar.Section>
        </Box>
        <Navbar.Section
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            padding: "16px",
            borderTop: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          })}
        >
          <ThemeSwitcher />
          <Link href="/terms-of-use">
            <Text
              c="dimmed"
              fz="xs"
              sx={{
                textAlign: "center",
              }}
            >
              Terms
            </Text>
          </Link>
          <Link href="/privacy-policy">
            <Text
              c="dimmed"
              fz="xs"
              sx={{
                textAlign: "center",
              }}
            >
              Privacy
            </Text>
          </Link>
          <Link href="/data-policy">
            <Text
              c="dimmed"
              fz="xs"
              sx={{
                textAlign: "center",
              }}
            >
              Data Policy
            </Text>
          </Link>
        </Navbar.Section>
      </Box>
    </Navbar>
  );
};

export default Nav;
