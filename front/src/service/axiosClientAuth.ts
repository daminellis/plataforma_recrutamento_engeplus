import { api } from "./axios";

export const apiClientInstace = () => {
  const token =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1] || "";

  api.defaults.headers["Authorization"] = `Bearer ${token}`;

  return api;
};
