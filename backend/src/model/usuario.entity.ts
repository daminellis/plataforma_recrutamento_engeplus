import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cargo } from './cargo.entity';
import { Setor } from './setor.entity';

export enum TipoUsuarioEnum {
  ADMIN = 'Administrador',
  RH = 'Recursos Humanos',
  LIDER = 'Líder',
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({type: 'varchar', length: 50, name: 'username', unique: true, nullable: false })
  username: string;

  @Column({type: 'varchar' , length: 100, name: 'nome_completo', nullable: false })
  nomeCompleto: string;

  @Column({type: 'varchar' ,length: 100, name: 'email', unique: true, nullable: false })
  email: string;

  @Column({type: 'varchar', length: 70, name: 'senha', nullable: false })
  senha: string;

  @Column({ type:'enum', name: 'tipo_usuario', enum: TipoUsuarioEnum, nullable: false })
  tipoUsuario: TipoUsuarioEnum;

  @ManyToOne(() => Cargo, cargo => cargo.usuarios)
  cargo: Cargo;

  @ManyToOne(() => Setor, setor => setor.id)
  setor: Setor;
}
export default Usuario;