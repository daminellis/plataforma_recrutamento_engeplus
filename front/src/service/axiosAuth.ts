import { api } from "@/service/axios";
import { cookies } from "next/headers";

export const apiAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  api.defaults.headers["Authorization"] = `Bearer ${token}`;

  return api;
};
