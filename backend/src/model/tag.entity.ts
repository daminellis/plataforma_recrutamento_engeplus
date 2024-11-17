import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
import {Vaga} from "./vaga.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({type:'varchar', length: 50, unique: true, name: 'nome', nullable: false})
    nome: string;

    @Column({type:'varchar', name: 'cor_tag', length: 7, nullable: false})
    corTag: string

    @ManyToMany(() => Vaga, vaga => vaga.tags)
    vagas: Vaga[];
}
export default Tag;