import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Usuario from './usuario.entity';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({type: 'varchar', length: 50, name: 'nome', unique: true, nullable: false })
  nome: string;

  @Column({type: 'varchar', length: 100, name: 'descricao' })
  descricao: string;

  @OneToMany(() => Usuario, (usuario) => usuario.cargo)
  usuarios: Usuario[];
}
export default Cargo;
