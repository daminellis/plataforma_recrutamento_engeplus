import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
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

  @Column({ type: 'varchar', length: 11, name: 'telefone' })
  telefone: string;

  @Column({ type: 'text', name: 'descricao' })
  descricao: string;

  @Column({ type: 'longblob', name: 'cv_data' })
  cvData: Buffer;

  @CreateDateColumn()
  dataRegistro: Date;

  @ManyToOne(() => Vaga, (vaga) => vaga.id)
  vaga: Vaga;
}
export default BancoTalentos;
