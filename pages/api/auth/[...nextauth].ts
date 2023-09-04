// @ts-nocheck

import CognitoProvider from "next-auth/providers/cognito";
import NextAuth from "next-auth";

const existenceCheck = async (userId: string) => {
  const exists = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/exists/${userId}`,
    {
      method: "GET",
    }
  );

  return exists.json();
};

const userCreation = async (user: {
  id: string;
  email: string;
  name: string;
  picture: string;
}) => {
  const profilePost = {
    id: user.id,
    email: user.email,
    full_name: user.name,
    receive_notifications: true,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profilePost),
  });
  return res.json();
};

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { exists } = await existenceCheck(user.id);

      if (exists) {
        return true;
      } else {
        const post = await userCreation(user);
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.sub;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user_id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
