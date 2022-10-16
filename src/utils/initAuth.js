import { init } from "next-firebase-auth";

const onError = (error) => console.error(error);

const initAuth = () => {
  init({
    authPageURL: "/login",
    appPageURL: "/dashboard",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    onLoginRequestError: onError,
    onLogoutRequestError: onError,
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
      },
      databaseURL: process.env.FIREBASE_ADMIN_DB_URL,
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_DB_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID,
    },
    cookies: {
      name: "SurvivorPool",
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000,
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      signed: true,
    },
    onVerifyTokenError: onError,
    onTokenRefreshError: onError,
  });
};

export default initAuth;
