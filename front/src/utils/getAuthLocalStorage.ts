"use client";

import { UserType } from "@/types/Auth";

type TokenController = {
  token: string;
  expires: Date;
};

export const getToken = (): TokenController | null => {
  return getData("token");
};

export const getUserInfos = (): UserType | null => {
  return getData("user");
};

const getData = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return null;

  return JSON.parse(data);
};
