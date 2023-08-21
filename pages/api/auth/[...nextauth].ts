import CognitoProvider from "next-auth/providers/cognito";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER as string,
    }),
  ],
};

export default NextAuth(authOptions);
