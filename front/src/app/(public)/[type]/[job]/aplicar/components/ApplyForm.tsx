"use client;";

import { TextField } from "@mui/material";

export const ApplyForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className="flex flex-col gap-5 w-full max-w-2xl">
      <TextField
        label="Nome completo"
        variant="outlined"
        type="text"
        required
      />
      <TextField
        label="Endereço de email"
        variant="outlined"
        type="email"
        required
      />
      <TextField label="Telefone" variant="outlined" type="tel" required />
      <TextField
        placeholder="Experiência profissional - Faça uma breve descrição das suas experiências relevantes"
        multiline
        rows={4}
        variant="outlined"
        type="tel"
      />
    </form>
  );
};
