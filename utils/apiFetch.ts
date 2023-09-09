import { getSession, signIn, signOut } from "next-auth/react";

import Router from "next/router";

const apiFetch = async (url: string, options?: any) => {
  const session = await getSession();
  // @ts-ignore
  const { accessToken } = session;

  if (!accessToken || !session) {
    signIn("cognito");
    return null;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    ...(options || {}),
    headers: {
      ...(options?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (res.status === 401 || !res.ok) {
    await signOut();
    await Router.push(`${process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URL}`);
  }

  return data;
};

export default apiFetch;
