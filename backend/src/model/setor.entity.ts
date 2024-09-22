import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Usuario from './usuario.entity';
import Vaga from './vaga.entity';

@Entity()
export class Setor {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 50, name: 'nome', unique: true })
    nome: string;

    @OneToMany(() => Usuario, usuario => usuario.setor)
    usuarios: Usuario[];

    @OneToMany(() => Vaga, vaga => vaga.setor)
    vagas: Vaga[];
}
export default Setor;