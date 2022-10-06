import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Button, Container } from "@mui/material";

import useFirebaseAuth from "../src/common/Auth/useFirebaseAuth";

const LoginPage = () => {
  const { signInWithGoogle } = useFirebaseAuth();
  return (
    <Container>
      <Button onClick={signInWithGoogle}>Google</Button>
    </Container>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(LoginPage);
