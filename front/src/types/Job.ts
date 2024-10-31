export type JobType = {
  id: number;
  titulo: string;
  salarioMinimo: string;
  salarioMaximo: string;
  regiao: string;
  dataPostagem: string;
  setor: Sector;
  tags: Tags[];
};

type Sector = {
  id: number;
  nome: string;
};

type Tags = {
  id: number;
  nome: string;
  corTag: string;
};

export type JobDetails = {
  id: number;
  titulo: string;
  salarioMinimo: string;
  salarioMaximo: string;
  educacao: string;
  tempoExperiencia: string;
  nivelExperiencia: string;
  modalidade: string;
  quantidadeVagas: number;
  dataExpiracao: string;
  descricao: string;
  responsabilidades: string[];
  regiao: string;
  dataPostagem: string;
  recrutador: Recruiter;
  setor: Sector;
  tags: Tags[];
};

type Recruiter = {
  id: number;
  username: string;
  nomeCompleto: string;
  email: string;
  tipoUsuario: string;
};