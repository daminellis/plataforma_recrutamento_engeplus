"use client";

import { LabelControl } from "@/components/form/LabelControl";
import { PasswordField } from "@/components/form/PasswordField";
import { PrimaryButton } from "@/components/ui/button/PrimaryButton";
import { Checkbox, TextField } from "@mui/material";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Login</h1>

      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField label="Email" variant="outlined" type="email" />
        <PasswordField label="Senha" />

        <LabelControl control={<Checkbox />} label="Lembrar-me" />

        <PrimaryButton type="submit">
          Login <ArrowRightIcon className="size-6" />
        </PrimaryButton>
      </form>
    </>
  );
}
