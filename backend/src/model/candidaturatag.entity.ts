import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {Candidatura} from "./candidatura.entity";

@Entity()
export class CandidaturaTag {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({type: 'varchar', length: 50, unique: true, name: 'nome', nullable: false })
    nome: string;

    @Column({type: 'varchar', name: 'cor_tag', length: 7})
    corTag: string

    @OneToMany(() => Candidatura, candidatura => candidatura.id)
    candidaturas: Candidatura[];
}
export default CandidaturaTag;