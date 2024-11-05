import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Usuario from './usuario.entity';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100, name: 'nome', unique: true, nullable: false })
  nome: string;

  @Column({ length: 255, name: 'descricao'})
  descricao: string;

  @OneToMany(() => Usuario, (usuario) => usuario.cargo)
  usuarios: Usuario[];
}
export default Cargo;
