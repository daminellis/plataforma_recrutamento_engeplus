"use client";

import { PasswordField } from "@/components/form/PasswordField";
import { AppButton } from "@/components/ui/button/AppButton";
import { Loading } from "@/components/ui/Loading";
import { api } from "@/service/axios";
import { AuthLogin } from "@/types/Auth";
import { CircularProgress, TextField } from "@mui/material";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const dto = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    handleLogin(dto);
  };

  const handleLogin = async (dto: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const { data } = await api.post<AuthLogin>("auth/login", dto);

      const maxAge = 40 * 60; // 40 minutos em segundos
      document.cookie = `token=${data.access_token}; path=/; max-age=${maxAge}; secure; samesite=strict`;
      document.cookie = `user=${JSON.stringify(
        data.user
      )}; path=/; max-age=${maxAge}; secure; samesite=strict`;

      document.cookie = `user=${JSON.stringify(
        data.user
      )}; path=/; max-age=86400; secure; samesite=strict`;

      localStorage.setItem(
        "token",
        JSON.stringify({
          token: data.access_token,
          expires: new Date(),
        })
      );
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/admin/dashboard");
    } catch (e) {
      if (e instanceof AxiosError && e.status == 401) {
        setError(e.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-semibold">Login</h1>

      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
        <TextField
          label="Usuário"
          variant="outlined"
          type="text"
          name="username"
          required
        />
        <PasswordField label="Senha" required />

        <AppButton type="submit">
          Login{" "}
          {isLoading ? (
            <Loading isWhite />
          ) : (
            <ArrowRightIcon className="size-6" />
          )}
        </AppButton>
      </form>
    </>
  );
}
