// src/database/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Candidatura } from '../model/candidatura.entity';
import { CandidaturaTag } from '../model/candidaturatag.entity';
import { Cargo } from '../model/cargo.entity';
import { Setor } from '../model/setor.entity';
import { Tag } from '../model/tag.entity';
import { Usuario } from '../model/usuario.entity';
import { Vaga } from '../model/vaga.entity';
import { BancoTalentos } from '../model/bancotalentos.entity';
import { GenerateMigration1732745371181 } from './migrations/1732745371181-GenerateMigration';
import 'dotenv/config';

const configService = new ConfigService();

export const typeOrmConfig: TypeOrmModuleOptions = {

  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [Candidatura, CandidaturaTag, Cargo, Setor, Tag, Usuario, Vaga, BancoTalentos],
  migrations: [GenerateMigration1732745371181],
  migrationsRun: true,
  synchronize: false,
}
