import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
import {Vaga} from "./vaga.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 50, unique: true, name: 'nome' })
    nome: string;

    @Column({name: 'cor_tag', length: 7})
    corTag: string

    @ManyToMany(() => Vaga, vaga => vaga.tags)
    vagas: Vaga[];
}
export default Tag;