import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Timestamp,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { Vaga } from './vaga.entity';
import {CandidaturaTag} from './candidaturatag.entity';

export enum StatusCandidatura {
  ATIVO = 'Ativo',
  INATIVO = 'Inativo',
  APROVADO = 'Aprovado',
  REPROVADO = 'Reprovado',
}
@Entity()
export class Candidatura {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 50, name: 'nome_completo' })
  nomeCompleto: string;

  @Column({ length: 50, name: 'email' })
  email: string;

  @Column({ type: 'text', name: 'telefone' })
  telefone: string;

  @Column({ type: 'text', name: 'descricao' })
  descricao: string;

  @Column({ type: 'longblob', name: 'cv_data' })
  cvData: Buffer;

  @Column({ type: 'varchar', name: 'cv_type' })
  cvType: string;

  @Column({ type: 'timestamp', name: 'data_candidatura', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  dataCandidatura: Timestamp;

  @Column({ type: 'boolean', name: 'favorito', default: false })
  favorito: boolean;

  @Column({ type: 'enum', enum: StatusCandidatura, name: 'status', default: StatusCandidatura.ATIVO })
  status: StatusCandidatura;

  @ManyToOne(() => Vaga, (vaga) => vaga.candidatura)
  vaga: Vaga;

  @ManyToOne(() => CandidaturaTag, candidaturaTag => candidaturaTag.candidaturas)
  candidaturaTagId: CandidaturaTag;
}
export default Candidatura;
