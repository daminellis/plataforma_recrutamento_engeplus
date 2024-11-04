
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {Tag} from '../model/tag.entity';
import {Vaga} from '../model/vaga.entity';
import {Candidatura} from '../model/candidatura.entity';
import {Usuario} from '../model/usuario.entity';
import {Setor} from '../model/setor.entity';
import {Cargo}from '../model/cargo.entity';
import { UsuarioModule } from 'src/module/usuario.module';
import { VagaModule } from 'src/module/vaga.module';
import { SetorModule } from 'src/module/setor.module';
import { CargoModule } from 'src/module/cargo.module';
import { TagModule } from 'src/module/tag.module';
import { CandidaturaModule } from 'src/module/candidatura.module';
import CandidaturaTag from 'src/model/candidaturatag.entity';
import { CandidaturaTagModule } from 'src/module/candidaturatag.module';
import BancoTalentos from 'src/model/bancotalentos.entity';
import { BancoTalentosModule } from 'src/module/bancotalentos.module';
import {CreateTableVaga1730253004000} from './migration/1730253004000-create_table_vaga';
import {CreateTableUsuario1730253002000} from './migration/1730253002000-create_table_usuario';
import {CreateTableSetor1730253000000} from './migration/1730253000000-create_table_setor';
import {CreateTableCargo1730253001000} from './migration/1730253001000-create_table_cargo';
import {CreateTableTag1730253003000} from './migration/1730253003000-create_table_tag';
import {CreateTableCandidatura1730253006000} from './migration/1730253006000-create_table_candidatura';
import {CreateTableCandidaturatag1730253005000} from './migration/1730253005000-create_table_candidaturatag';
import {CreateTableBancotalentos1730253007000} from './migration/1730253007000-create_table_bancotalentos';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Candidatura, CandidaturaTag, Cargo, Setor, Tag, Usuario, Vaga, BancoTalentos],
        synchronize: true,
        // migrations: 
        // [
        //   CreateTableSetor1730253000000,
        //   CreateTableCargo1730253001000,
        //   CreateTableUsuario1730253002000,
        //   CreateTableTag1730253003000,
        //   CreateTableVaga1730253004000,
        //   CreateTableCandidaturatag1730253005000,
        //   CreateTableCandidatura1730253006000,
        //   CreateTableBancotalentos1730253007000
        // ],
        // migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    UsuarioModule,
    VagaModule,
    SetorModule,
    CargoModule,
    TagModule,
    CandidaturaModule,
    CandidaturaTagModule,
    BancoTalentosModule
  ],
})
export class DatabaseModule {}
