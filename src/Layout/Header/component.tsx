import { Box, Button, Container } from "@mui/material";

import { FC } from "react";
import { useRouter } from "next/router";

export const Header: FC = (props) => {
  const router = useRouter();

  const onLoginClick = () => {
    router.push("/login");
  };

  const shouldShowLogin = router.pathname !== "/login";

  return (
    <Container
      disableGutters
      sx={{
        padding: "20px 40px",
      }}
    >
      {shouldShowLogin && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
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
        </Box>
      )}
    </Container>
  );
};
