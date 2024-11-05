import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {Candidatura} from "./candidatura.entity";

@Entity()
export class CandidaturaTag {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 50, unique: true, name: 'nome', nullable: false })
    nome: string;

    @Column({name: 'cor_tag', length: 7})
    corTag: string

    @OneToMany(() => Candidatura, candidatura => candidatura.candidaturaTagId)
    candidaturas: Candidatura[];
}
export default CandidaturaTag;