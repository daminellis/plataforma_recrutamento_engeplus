export type CandidatureType = {
  id: number;
  nomeCompleto: string;
  email: string;
  telefone: string;
  descricao: string;
  cvType: string;
  cvData: {
    data: Buffer;
  };
  dataCandidatura: string;
  favorito: boolean;
  status: "Ativo" | "Inativo" | "Aprovado" | "Reprovado";
};
