"use client";

import { useEffect, useState } from "react";
import { usePrivateApi } from "@/hooks/usePrivateApi";
import { CandidatureType } from "@/types/Candidature";

export default function TestePage() {
  const { error, data } = usePrivateApi<CandidatureType>(
    "get",
    "/candidaturas/find/1"
  );
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data && data.cvData.data && data.cvType) {
      // Converter o buffer binário em um Blob
      const blob = new Blob([new Uint8Array(data.cvData.data)], {
        type: data.cvType,
      });

      const url = URL.createObjectURL(blob);

      // Salvar a URL do blob para exibição
      setFileUrl(url);

      // Limpar a URL do blob ao desmontar o componente
      return () => URL.revokeObjectURL(url);
    }
  }, [data]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex-1">
      <h1>Arquivo Recebido</h1>
      {fileUrl ? (
        <iframe
          src={fileUrl}
          style={{ width: "100%", height: "100vh", border: "none" }}
          title="Visualização do Arquivo"
        />
      ) : (
        <p>Carregando o arquivo...</p>
      )}
    </div>
  );
}
