import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Vaga } from './vaga.entity';

@Entity()
export class BancoTalentos {
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

  @ManyToOne(() => Vaga, (vaga) => vaga.bancoTalentos)
  vaga: Vaga;
}
export default BancoTalentos;
