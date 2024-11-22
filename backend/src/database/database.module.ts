import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './typeorm.config';
import { BancoTalentosModule } from 'src/module/bancotalentos.module';
import { CandidaturaModule } from 'src/module/candidatura.module';
import { CandidaturaTagModule } from 'src/module/candidaturatag.module';
import { CargoModule } from 'src/module/cargo.module';
import { SetorModule } from 'src/module/setor.module';
import { TagModule } from 'src/module/tag.module';
import { UsuarioModule } from 'src/module/usuario.module';
import { VagaModule } from 'src/module/vaga.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => typeOrmConfig,
      inject: [ConfigService],
    }),
    BancoTalentosModule,
    CargoModule,
    CandidaturaModule,
    CandidaturaTagModule,
    SetorModule,
    TagModule,
    UsuarioModule,
    VagaModule
  ],
})
export class DatabaseModule {}
