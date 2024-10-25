import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Timestamp,
  OneToOne,
} from 'typeorm';
import { Vaga } from './vaga.entity';
import {CandidaturaTag} from './candidaturatag.entity';

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

  @Column({ type: 'blob', name: 'cv' })
  cvData: Buffer;

  @Column({ type: 'timestamp', name: 'data_candidatura', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  dataCandidatura: Timestamp;

  @Column({ type: 'boolean', name: 'favorito', default: false })
  favorito: boolean;

  @ManyToOne(() => Vaga, (vaga) => vaga.candidatura)
  vaga: Vaga;

  @ManyToOne(() => CandidaturaTag, candidaturaTag => candidaturaTag.candidaturas)
  candidaturaTags: CandidaturaTag;
}
export default Candidatura;
