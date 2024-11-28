"use client";

import { apiClientInstace } from "@/service/axiosClientAuth";
import { getUserInfos } from "@/utils/getAuthLocalStorage";

export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const userInfos = getUserInfos();

  const dto = {
    titulo: formData.get("titulo") as string,
    salarioMinimo: parseFloat(formData.get("salarioInicial") as string),
    salarioMaximo: parseFloat(formData.get("salarioFinal") as string),
    educacao: formData.get("educacao") as string,
    tempoExperiencia: formData.get("experiencia") as string,
    nivelExperiencia: formData.get("nivelExperiencia") as string,
    modalidade: formData.get("modalidade") as string,
    quantidadeVagas: parseInt(formData.get("numeroVagas") as string),
    dataExpiracao: new Date(formData.get("dataExpiracao") as string)
      .toISOString()
      .split("T")[0],
    descricao: formData.get("descricao") as string,
    responsabilidades: (formData.get("responsabilidades") as string).split("/"),
    regiao: formData.get("regiao") as string,
    recruiterId: userInfos?.id,
    setorId: parseInt(formData.get("setor") as string),
    tagIds: (formData.get("tags") as string).split(",").map(Number),
  };

  await apiClientInstace()
    .post("vagas/create", dto)
    .then((res) => {
      window.location.href = "/admin/dashboard";
    });
};
