import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Vaga } from './vaga.entity';

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

  @Column({ length: 512, name: 'cv_url' })
  cvUrl: string;

  @Column({ type: 'boolean', name: 'favorito', default: false })
  favorito: boolean;

  @ManyToOne(() => Vaga, (vaga) => vaga.candidatura)
  vaga: Vaga;
}
export default Candidatura;
