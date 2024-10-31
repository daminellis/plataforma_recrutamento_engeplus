import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cargo } from './cargo.entity';
import { Setor } from './setor.entity';
import { Vaga } from './vaga.entity';

export enum TipoUsuarioEnum {
  ADMIN = 'Administrador',
  RH = 'Recursos Humanos',
  LIDER = 'Lider',
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 50, name: 'username', unique: true, nullable: false })
  username: string;

  @Column({ length: 100, name: 'nome_completo' })
  nomeCompleto: string;

  @Column({ length: 100, name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ length: 70, name: 'senha_hash' })
  senhaHash: string;

  @Column({ type:'enum', name: 'tipo_usuario', enum: TipoUsuarioEnum })
  tipoUsuario: TipoUsuarioEnum;

  @ManyToOne(() => Cargo, cargo => cargo.usuarios)
  cargo: Cargo;

  @ManyToOne(() => Setor, setor => setor.usuarios)
  setor: Setor;

  @OneToMany(() => Vaga, vaga => vaga.recrutador)
  vagas: Vaga[];
}
export default Usuario;