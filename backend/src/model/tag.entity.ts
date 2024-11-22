import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
// import {Vaga} from "./vaga.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({type: 'varchar', length: 50, unique: true, name: 'nome' })
    nome: string;

    @Column({type: 'varchar', name: 'cor_tag', length: 7})
    corTag: string
}
export default Tag;