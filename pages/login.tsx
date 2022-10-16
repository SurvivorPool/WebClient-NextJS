import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

import { FC } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import useFirebaseAuth from "../src/common/Auth/useFirebaseAuth";

const StyledButton: FC<{
  onClick: any;
  label: string;
  providerStyles: any;
  Icon: any;
}> = ({ onClick, label, providerStyles, Icon }) => (
  <Button
    variant="contained"
    onClick={onClick}
    sx={(theme) => ({
      color: "#FFF",
      width: { xs: "100%", sm: "240px" },
      maxWidth: "240px",
      padding: "12px 8px",
      fontFamily: theme.fonts.raleway,
      textTransform: "none",
      fontWeight: 800,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      ...providerStyles,

      "&:hover": {
        opacity: 0.8,
        ...providerStyles,
      },
    })}
  >
    <Box width="100px">{label}</Box>
    <Box
      sx={{
        marginLeft: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Icon}
    </Box>
  </Button>
);

const LoginPage = () => {
  const { signInWithGoogle, signInWithFacebook, signInWithGithub } =
    useFirebaseAuth();
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={(theme) => ({
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(45deg, ${theme.colors.lightGreen}, ${theme.colors.green} 0%, ${theme.colors.orange}, ${theme.colors.burntOrange} 100%)`,
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        borderBottom: `1px solid ${theme.colors.border}`,

        "@keyframes gradient": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      })}
    >
      <Paper
        sx={(theme) => ({
          backgroundColor: theme.colors.offWhite,
          border: `1px solid grey ${theme.colors.border}`,
          paddingY: "100px",
          paddingX: { xs: "20", sm: "100px" },
          width: { xs: "100%", sm: "500px" },
          borderRadius: "4px",
          position: "relative",
        })}
      >
        <Link href={"/"}>
          <Typography
            sx={(theme) => ({
              fontFamily: theme.fonts.happyFox,
              fontSize: "2rem",
              fontWeight: 700,
              color: theme.colors.burntOrange,
              textAlign: "center",
              position: "absolute",
              top: 16,
              left: 24,
              cursor: "pointer",
            })}
          >
            SurvivorPool
          </Typography>
        </Link>
        <Typography
          sx={(theme) => ({
            fontFamily: theme.fonts.raleway,
            fontSize: "1.5rem",
            fontWeight: 700,
            color: theme.colors.burntOrange,
            marginBottom: "24px",
            textAlign: "center",
          })}
        >
          Login to Play!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <StyledButton
            onClick={signInWithGoogle}
            label={"Google"}
            providerStyles={{ backgroundColor: "#e0321c" }}
            Icon={<GoogleIcon fontSize="medium" />}
          />
          <StyledButton
            onClick={signInWithFacebook}
            label={"Facebook"}
            providerStyles={{ backgroundColor: "#304d8a" }}
            Icon={<FacebookIcon fontSize="medium" />}
          />
          <StyledButton
            onClick={signInWithGithub}
            label={"Github"}
            providerStyles={{ backgroundColor: "#838383" }}
            Icon={<GitHubIcon fontSize="medium" />}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(LoginPage);
