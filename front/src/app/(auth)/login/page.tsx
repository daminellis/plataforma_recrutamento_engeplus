"use client";

import { LabelControl } from "@/components/form/LabelControl";
import { PasswordField } from "@/components/form/PasswordField";
import { AppButton } from "@/components/ui/button/AppButton";
import { api } from "@/service/axios";
import { Checkbox, TextField } from "@mui/material";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
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
    try {
      const response = await api.post("auth/login", dto);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-semibold">Login</h1>

      <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
        <TextField
          label="Usuário"
          variant="outlined"
          type="text"
          name="username"
        />
        <PasswordField label="Senha" />

        <LabelControl control={<Checkbox />} label="Lembrar-me" />

        <AppButton type="submit">
          Login <ArrowRightIcon className="size-6" />
        </AppButton>
      </form>
    </>
  );
}
