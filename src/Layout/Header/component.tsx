import { Box, Button, Container } from "@mui/material";

import { useLogin } from "../../common/Auth/useLogin";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { withAuthUser } from "next-firebase-auth";

export const Header = withAuthUser()(() => {
  const router = useRouter();
  const { isLoggedIn, signOut } = useLogin();

  const onLoginClick = () => {
    router.push("/login");
  };

  const isLoginPage = useMemo(() => router.pathname === "/login", [router]);

  const shouldShowLogin = useMemo(() => {
    return !isLoggedIn && !isLoginPage;
  }, [isLoggedIn, isLoginPage]);

  const shouldShowLogout = useMemo(() => {
    return isLoggedIn && !isLoginPage;
  }, [isLoggedIn, isLoginPage]);

  return (
    <Container
      disableGutters
      sx={{
        padding: "20px 40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {shouldShowLogin && (
          <Button
            onClick={onLoginClick}
            sx={({ colors }) => ({
              backgroundColor: colors.lavender,
              padding: "8px",
              textTransform: "none",
              color: colors.offWhite,
              width: "120px",
              fontSize: "1rem",
              border: `1px solid ${colors.lightLavender}`,
              fontWeight: 600,

              "&:hover, &:active": {
                backgroundColor: colors.lightLavender,
                border: `1px solid ${colors.lavender}`,
              },
            })}
          >
            Login
          </Button>
        )}
        {shouldShowLogout && (
          <Button
            onClick={signOut}
            sx={({ colors }) => ({
              backgroundColor: colors.lavender,
              padding: "8px",
              textTransform: "none",
              color: colors.offWhite,
              width: "120px",
              fontSize: "1rem",
              border: `1px solid ${colors.lightLavender}`,
              fontWeight: 600,

              "&:hover, &:active": {
                backgroundColor: colors.lightLavender,
                border: `1px solid ${colors.lavender}`,
              },
            })}
          >
            Logout
          </Button>
        )}
      </Box>
    </Container>
  );
});
