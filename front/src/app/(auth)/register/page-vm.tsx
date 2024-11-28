import { apiClientInstace } from "@/service/axiosClientAuth";
import { SectorType } from "@/types/Job";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function PageVM() {
  // Data states
  const [positionData, setPositionData] = useState<SectorType[]>([]);
  const [sectorData, setSectorData] = useState<SectorType[]>([]);

  // Generic states
  const [showSectors, setShowSectors] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    apiClientInstace()
      .get<SectorType[]>("cargos/all")
      .then((response) => {
        setPositionData(response.data);
      })
      .catch(() => {
        toast.error("Erro ao carregar os cargos");
      });
  }, []);

  useEffect(() => {
    if (showSectors && !sectorData.length) {
      apiClientInstace()
        .get<SectorType[]>("setores/all")
        .then((response) => {
          setSectorData(response.data);
        })
        .catch(() => {
          toast.error("Erro ao carregar os setores");
        });
    }
  }, [showSectors]);

  const isShowSectors = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Líder") {
      setShowSectors(true);
    } else {
      setShowSectors(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (formData.get("senha") !== formData.get("confirmaSenha")) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoadingSubmit(true);

    const dto = {
      username: formData.get("username"),
      nomeCompleto: formData.get("nomeCompleto"),
      email: formData.get("email"),
      senha: formData.get("senha"),
      tipoUsuario: formData.get("cargoId"),
      setorId: parseInt(formData.get("setorId")?.toString() || "0"),
      cargoId:
        parseInt(
          positionData
            .find((p) => p.nome === formData.get("cargoId"))
            ?.id.toString() || "0"
        ) || null,
    };

    apiClientInstace()
      .post("auth/register", dto)
      .then(() => {
        toast.success("Usuário criado com sucesso");

        router.push("admin/dashboard");
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 500) {
          toast.error("Já existe um usuário com estas informações");
          return;
        }

        toast.error("Erro ao criar o usuário");
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  return {
    positionData,
    sectorData,
    showSectors,
    isShowSectors,
    handleSubmit,
    loadingSubmit,
  };
}
