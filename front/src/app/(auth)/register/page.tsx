"use client";

import { SelectLabel } from "@/components/form/SelectLabel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageVM } from "./page-vm";
import { TextField } from "@mui/material";
import { AppButton } from "@/components/ui/button/AppButton";
import { PasswordField } from "@/components/form/PasswordField";
import { Loading } from "@/components/ui/Loading";

const rowClass = "flex gap-4";
const propsInputs = {
  variant: "outlined",
  size: "small",
  className: "flex-1",
  required: true,
} as const;

export default function RegisterPage() {
  const props = PageVM();

  return (
    <>
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Criar conta</h1>

      <form className="flex flex-col gap-4 mt-5" onSubmit={props.handleSubmit}>
        <div className={rowClass}>
          <SelectLabel
            idAndName="cargoId"
            label="Cargo"
            data={props.positionData}
            className="flex-1"
            onChange={props.isShowSectors}
            required
          />

          {props.showSectors && (
            <SelectLabel
              idAndName="setorId"
              label="Setor"
              data={props.sectorData}
              className="flex-1"
              valueIsId
              required
            />
          )}
        </div>

        <div className={rowClass}>
          <TextField
            label="Nome completo"
            name="nomeCompleto"
            type="text"
            {...propsInputs}
          />

          <TextField
            label="Nome de usuário"
            name="username"
            type="text"
            {...propsInputs}
          />
        </div>

        <TextField label="E-mail" name="email" type="email" {...propsInputs} />

        <PasswordField label="Senha" name="senha" {...propsInputs} />

        <PasswordField
          label="Confirma senha"
          name="confirmaSenha"
          {...propsInputs}
        />

        <AppButton type="submit">
          {props.loadingSubmit ? <Loading isWhite /> : "Criar conta"}
        </AppButton>
      </form>
    </>
  );
}
