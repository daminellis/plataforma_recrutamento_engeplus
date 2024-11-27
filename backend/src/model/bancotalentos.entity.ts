import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class BancoTalentos {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({type: 'varchar', length: 50, name: 'nome_completo' })
  nomeCompleto: string;

  @Column({type: 'varchar', length: 50, name: 'email' })
  email: string;

  @Column({type: 'varchar', length:11 , name: 'telefone' })
  telefone: string;

  @Column({ type: 'text',name: 'descricao' })
  descricao: string;

  @Column({ type: 'longblob', name: 'cv_data' })
  cvData: Buffer;

  @Column({ type: 'varchar', length: 50, name: 'cv_type' })
  cvType: string;

  @Column({ type: 'int', name: 'vaga_id' })
  vagaId: number;

  @Column({type: 'varchar', length: 100, name: 'titulo_vaga'})
  vagaTitulo: string;

  @Column({ type: 'text', name: 'descricao_vaga' })
  descricaoVaga: string;
}
export default BancoTalentos;
