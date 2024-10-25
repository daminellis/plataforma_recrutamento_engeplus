
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
        entities: [__dirname + '/../**/*.entity{.ts}'],
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
    CandidaturaTagModule
  ],
})
export class DatabaseModule {}
