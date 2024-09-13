import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tag } from './tag.entity';
import { Vaga } from './vaga.entity';

@Entity()
export class VagaTag {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Vaga, vaga => vaga.vagatag)
    vaga: Vaga[];

    @ManyToOne(() => Tag, tag => tag.vagatag)
    tag: Tag[];
}
export default VagaTag;