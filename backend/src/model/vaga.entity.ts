import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Timestamp,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Setor } from './setor.entity';
import { Usuario } from './usuario.entity';
import { Candidatura } from './candidatura.entity';
import { Tag } from './tag.entity';
// import BancoTalentos from './bancotalentos.entity';

export enum NivelDeEducacao {
  ENSINO_MEDIO = 'Ensino Médio',
  SUPERIOR = 'Superior',
  POS_GRADUACAO = 'Pós-Graduação',
}

export enum TempoDeExperiencia {
  MENOS_DE_1_ANO = 'Menos de 1 ano',
  _1_3_ANOS = '1-3 anos',
  _3_5_ANOS = '3-5 anos',
  MAIS_DE_5_ANOS = 'Mais de 5 anos',
}

export enum NivelDeExperiencia {
  JUNIOR = 'Júnior',
  PLENO = 'Pleno',
  SENIOR = 'Sênior',
}

export enum Modalidade {
  PRESENCIAL = 'Presencial',
  REMOTO = 'Remoto',
  HIBRIDO = 'Híbrido',
}

@Entity()
export class Vaga {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type:'varchar', length: 100, name: 'titulo', nullable: false })
  titulo: string;

  @Column({ type: 'numeric', name: 'salario_minimo', precision: 10, scale: 2, nullable: false })
  salarioMinimo: number;

  @Column({ type: 'numeric', name: 'salario_maximo', precision: 10, scale: 2, nullable: false })
  salarioMaximo: number;

  @Column({ type: 'enum', enum: NivelDeEducacao, name: 'educacao', nullable: false })
  educacao: NivelDeEducacao;

  @Column({ type: 'enum', enum: TempoDeExperiencia, name: 'tempo_experiencia', nullable: false })
  tempoExperiencia: TempoDeExperiencia;

  @Column({ type: 'enum', enum: NivelDeExperiencia, name: 'nivel_experiencia', nullable: false })
  nivelExperiencia: NivelDeExperiencia;

  @Column({ type: 'enum', enum: Modalidade, name: 'modalidade', nullable: false })
  modalidade: Modalidade;

  @Column({ type: 'int', name: 'qtd_vagas', nullable: false })
  quantidadeVagas: number;

  @Column({ type: 'date', name: 'data_expiracao', nullable: false })
  dataExpiracao: Date;

  @Column({ type: 'text', name: 'descricao', nullable: false })
  descricao: string;

  @Column({ type: 'simple-array', name: 'responsabilidades', nullable: false })
  responsabilidades: string[];

  @Column({ type: 'varchar', length:50, name: 'regiao', nullable: false})
  regiao: string;

  @Column({
    type: 'timestamp',
    name: 'data_postagem',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataPostagem: Timestamp;

  @Column({ default: true, name: 'disponivel', nullable: false })
  disponivel: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.id, { nullable: false })
  recrutador: Usuario;

  @ManyToOne(() => Setor, (setor) => setor.id, { nullable: false })
  setor: Setor;

  @OneToMany(() => Candidatura, (candidatura) => candidatura.vaga)
  candidatura: Candidatura[];

  // @OneToMany(() => BancoTalentos, (bancoTalentos) => bancoTalentos.vaga)
  // bancoTalentos: BancoTalentos[];

  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinTable({
    name: 'vaga_tags_tag',
    joinColumn: {
      name: 'vagaId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];
}
export default Vaga;
