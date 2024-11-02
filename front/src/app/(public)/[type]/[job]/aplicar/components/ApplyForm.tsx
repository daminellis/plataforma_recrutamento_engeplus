"use client";

import { AppButton } from "@/components/ui/button/AppButton";
import { TextField } from "@mui/material";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { DropFileField } from "@/components/form/DropFileField";
import { api } from "@/service/axios";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Loading } from "@/components/ui/Loading";

export const ApplyForm = ({ jobId }: { jobId: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    api.defaults.headers["Content-Type"] = "multipart/form-data";

    const form = new FormData(e.currentTarget);

    form.append("vagaId", jobId.toString());

    setIsLoading(true);
    await api
      .post("/candidaturas/create", form)
      .then((res) => {
        router.push(`${pathname}/sucesso`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className="flex flex-col gap-5 w-full max-w-2xl"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Nome completo"
        variant="outlined"
        name="nomeCompleto"
        type="text"
        required
      />
      <TextField
        label="Endereço de email"
        variant="outlined"
        name="email"
        type="email"
        required
      />
      <TextField
        label="Telefone"
        name="telefone"
        variant="outlined"
        type="tel"
        required
      />

      <textarea
        className="border border-gray-400 outline-blue-500 p-5 rounded"
        name="descricao"
        id="descricao"
        placeholder="Experiência profissional - Faça uma breve descrição das suas experiências relevantes"
        rows={4}
        minLength={10}
      ></textarea>

      <DropFileField />

      <AppButton type="submit">
        Enviar candidatura
        {isLoading ? (
          <Loading isWhite />
        ) : (
          <ArrowRightIcon className="size-5" />
        )}
      </AppButton>
    </form>
  );
};
