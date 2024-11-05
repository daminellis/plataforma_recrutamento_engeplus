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
import {GenerateMigration1730768596585} from './migrations/1730768596585-GenerateMigration';
import 'dotenv/config';

export function getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Candidatura, CandidaturaTag, Cargo, Setor, Tag, Usuario, Vaga, BancoTalentos],
    migrations: [GenerateMigration1730768596585],
    migrationsRun: true,
    synchronize: false,
  };
}
