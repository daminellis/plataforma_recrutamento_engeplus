
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
import {CreateTableVaga1730253034085} from './migration/1730253034085-create_table_vaga';
import {CreateTableUsuario1730253082745} from './migration/1730253082745-create_table_usuario';
import {CreateTableSetor1730253130462} from './migration/1730253130462-create_table_setor';
import {CreateTableCargo1730253140445} from './migration/1730253140445-create_table_cargo';
import {CreateTableTag1730253145492} from './migration/1730253145492-create_table_tag';
import {CreateTableCandidatura1730253163974} from './migration/1730253163974-create_table_candidatura';
import {CreateTableCandidaturatag1730253172222} from './migration/1730253172222-create_table_candidaturatag';
import {CreateTableBancotalentos1730253191858} from './migration/1730253191858-create_table_bancotalentos';

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
        migrations: 
        [
          CreateTableSetor1730253130462,
          CreateTableCargo1730253140445,
          CreateTableUsuario1730253082745,
          CreateTableTag1730253145492,
          CreateTableVaga1730253034085,
          CreateTableCandidaturatag1730253172222,
          CreateTableCandidatura1730253163974,
          CreateTableBancotalentos1730253191858
        ],
        migrationsRun: true,
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
