import { useAuthUser } from "next-firebase-auth";

const noop = () => {};

export const useLogin = () => {
  const authUser = useAuthUser();

  return {
    photoUrl: authUser?.photoURL || undefined,
    isLoggedIn: !!authUser.id,
    displayName: authUser?.displayName || undefined,
    email: authUser?.email || undefined,
    signOut: authUser.signOut || noop,
  };
};
