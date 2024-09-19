import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cargo } from './cargo.entity';
import { Setor } from './setor.entity'; 
import {Vaga} from './vaga.entity';

//TO DO: Definir not null em tudo que precisar.
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn({type: 'int', name: 'id', })
  id: number;

  @Column({ length: 50, name: 'username', unique: true, nullable: false })
  username: string;

  @Column({ length: 100, name: 'nome_completo' })
  nomeCompleto: string;

  @Column({ length: 100, name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ length: 8, name: 'senha_hash' })
  senhaHash: string;

  @ManyToOne(() => Cargo, cargo => cargo.usuarios)
  cargo: Cargo[];

  @ManyToOne(() => Setor, setor => setor.usuarios)
  setor: Setor[];

  @OneToMany(() => Vaga, vaga => vaga.recruiter)
  vagas: Vaga[];
}
export default Usuario;