// @ts-nocheck

import { getSession, signIn } from "next-auth/react";

const apiFetch = async (url: string, options?: any) => {
  const session = await getSession();
  const { accessToken } = session;

  if (!accessToken || !session) {
    signIn();
    return;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    ...(options || {}),
    headers: {
      ...(options?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();

  if (res.status === 401) {
    signIn();
    return;
  }

  return data;
};

export default apiFetch;
