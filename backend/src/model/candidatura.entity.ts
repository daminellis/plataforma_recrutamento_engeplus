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

  @Column({ length: 50, name: 'nome_completo', nullable: false })
  nomeCompleto: string;

  @Column({ length: 50, name: 'email', nullable: false })
  email: string;

  @Column({ type: 'text', name: 'telefone', nullable: false })
  telefone: string;

  @Column({ type: 'text', name: 'descricao', nullable: false })
  descricao: string;

  @Column({ type: 'longblob', name: 'cv_data', nullable: false })
  cvData: Buffer;

  @Column({ type: 'varchar', length: 100, name: 'cv_type', nullable: false })
  cvType: string;

  @Column({ type: 'timestamp', name: 'data_candidatura', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  dataCandidatura: Timestamp;

  @Column({ type: 'boolean', name: 'favorito', default: false, nullable: false })
  favorito: boolean;

  @Column({ type: 'enum', enum: StatusCandidatura, name: 'status', default: StatusCandidatura.ATIVO, nullable: false })
  status: StatusCandidatura;

  @ManyToOne(() => Vaga, (vaga) => vaga.candidatura, {nullable: false})
  vaga: Vaga;

  @ManyToOne(() => CandidaturaTag, candidaturaTag => candidaturaTag.candidaturas)
  candidaturaTagId: CandidaturaTag;
}
export default Candidatura;
