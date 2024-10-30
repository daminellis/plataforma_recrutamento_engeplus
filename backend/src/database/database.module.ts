
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
        // migrations: [],
        synchronize: true, //TIRA ISSO EM PRODUÇÃO PELO AMOR DE DEUS!!!
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
