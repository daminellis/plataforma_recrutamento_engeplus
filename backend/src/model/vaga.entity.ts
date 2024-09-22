import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Setor } from './setor.entity'; 
import {Usuario} from './usuario.entity';
import { Candidatura } from './candidatura.entity';
import { VagaTag } from './vagatag.entity';

export enum NivelDeEducacao {
  ENSINO_MEDIO = 'Ensino Médio',
  SUPERIOR = 'Superior',
  POS_GRADUACAO = 'Pós-Graduação',
}

export enum TempoDeExperiencia {
  MENOS_DE_1_ANO = 'Menos de 1 ano',
  _1_3_ANOS = '1-3 anos',
  _3_5_ANOS = '3-5 anos',
  MAIS_DE_5_ANOS = 'Mais de 5 anos',
}

export enum NivelDeExperiencia {
  JUNIOR = 'Júnior',
  PLENO = 'Pleno',
  SENIOR = 'Sênior',
}

export enum Modalidade {
  PRESENCIAL = 'Presencial',
  REMOTO = 'Remoto',
  HIBRIDO = 'Híbrido',
}

@Entity()
export class Vaga {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column({ length: 100, name: 'titulo' })
  titulo: string;

  @Column({ type: 'numeric', name:"salario_minimo", precision: 10, scale: 2 })
  salarioMinimo: number;

  @Column({ type: 'numeric', name: "salario_maximo", precision: 10, scale: 2 })
  salarioMaximo: number;

  @Column({ type: 'enum', enum: NivelDeEducacao, name: 'educacao' })
  educacao: NivelDeEducacao;

  @Column({ type: 'enum', enum: TempoDeExperiencia, name: 'tempo_experiencia' })
  tempoExperiencia: TempoDeExperiencia;

  @Column({ type: 'enum', enum: NivelDeExperiencia, name: 'nivel_experiencia' })
  nivelExperiencia: NivelDeExperiencia;

  @Column({ type: 'enum', enum: Modalidade, name: 'modalidade' })
  modalidade: Modalidade;

  @Column({ type: 'int', name: 'qtd_vagas' })
  quantidadeVagas: number;

  @Column({ type: 'date', name: 'data_expiracao', nullable: false})
  dataExpiracao: Date;

  @Column({ type: 'text', name: 'descricao' })
  descricao: string;

  @Column({ type: 'text', name: 'responsabilidades' })
  responsabilidades: string;

  @Column({ default: true, name: 'disponivel' })
  disponivel: boolean;

  @ManyToOne(() => Usuario, usuario => usuario.vagas)
  recruiter: Usuario[];

  @ManyToOne(() => Setor, setor => setor.vagas)
  setor: Setor[];
  
  @OneToMany(() => Candidatura, candidatura => candidatura.vaga)
  candidatura: Candidatura[];

  @OneToMany (() => VagaTag, vagatag => vagatag.vaga)
  vagatag: VagaTag[];
}
export default Vaga;