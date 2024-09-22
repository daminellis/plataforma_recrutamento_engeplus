import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { VagaTag } from "./vagatag.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 50, unique: true, name: 'nome' })
    nome: string;

    @OneToMany(() => VagaTag, vagatag => vagatag.tag)
    vagatag: VagaTag[];
}
export default Tag;