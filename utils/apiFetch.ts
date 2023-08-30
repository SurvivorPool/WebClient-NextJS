// @ts-nocheck

import { getSession, signIn } from "next-auth/react";

import { notifications } from "@mantine/notifications";

const apiFetch = async (url: string, options?: any) => {
  const session = await getSession();
  const { accessToken } = session;

  if (!accessToken || !session) {
    signIn();
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

  if (res.status === 401) {
    notifications.show({
      title: "Session Expired",
      color: "red",
      message: "Please login again to continue.",
    });
    signIn();
    throw new Error("Session Expired.");
  }

  if (!res.ok) {
    notifications.show({
      title: "Error",
      color: "red",
      message:
        data?.detail ||
        "Something went wrong, try reloading the page or logging in again.",
    });
    throw new Error(data?.detail || "Something went wrong.");
  }

  return data;
};

export default apiFetch;
