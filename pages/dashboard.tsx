import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import { Container } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import { getLeagues } from "src/common/API/Leagues";

const DashboardPage = (props: any) => {
  const authUser = useAuthUser();
  console.log(props.leagues);
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
        backgroundBlendMode: "overlay",
        borderBottom: `1px solid ${theme.colors.border}`,
        background: `linear-gradient(45deg, ${theme.colors.lightGreen} 0%, ${theme.colors.honeydew}, ${theme.colors.green} 100%)`,
        backgroundSize: "400% 400%",
        animation: "gradient 20s ease infinite",

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
      Dashboard
    </Container>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const token = await AuthUser.getIdToken();
  const queryClient = new QueryClient();
  let leagues = [];

  if (token) {
    leagues = await queryClient.fetchQuery(["leagues"], () =>
      getLeagues(token)
    );
  }

  return {
    props: {
      leagues,
    },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(DashboardPage);
