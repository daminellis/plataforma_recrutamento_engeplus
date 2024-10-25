import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {Candidatura} from "./candidatura.entity";

@Entity()
export class CandidaturaTag {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 50, unique: true, name: 'nome' })
    nome: string;

    @Column({name: 'cor_tag'})
    corTag: string

    @OneToMany(() => Candidatura, candidatura => candidatura.candidaturaTags)
    candidaturas: Candidatura[];
}
export default CandidaturaTag;