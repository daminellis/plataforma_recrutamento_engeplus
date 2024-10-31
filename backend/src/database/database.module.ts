
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioModule } from 'src/module/usuario.module';
import { VagaModule } from 'src/module/vaga.module';
import { SetorModule } from 'src/module/setor.module';
import { CargoModule } from 'src/module/cargo.module';
import { TagModule } from 'src/module/tag.module';
import { CandidaturaModule } from 'src/module/candidatura.module';
import { CandidaturaTagModule } from 'src/module/candidaturatag.module';
import { BancoTalentosModule } from 'src/module/bancotalentos.module';
import Candidatura from 'src/model/candidatura.entity';
import CandidaturaTag from 'src/model/candidaturatag.entity';
import Cargo from 'src/model/cargo.entity';
import Setor from 'src/model/setor.entity';
import Tag from 'src/model/tag.entity';
import Usuario from 'src/model/usuario.entity';
import Vaga from 'src/model/vaga.entity';
import BancoTalentos from 'src/model/bancotalentos.entity';

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
