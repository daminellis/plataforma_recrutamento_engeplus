
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Tag} from '../model/tag.entity';
import {VagaTag} from '../model/vagatag.entity';
import {Vaga} from '../model/vaga.entity';
import {Candidatura} from '../model/candidatura.entity';
import {Usuario} from '../model/usuario.entity';
import {Setor} from '../model/setor.entity';
import {Cargo}from '../model/cargo.entity';
import { UsuarioModule } from 'src/module/usuario.module';
import { VagaModule } from 'src/module/vaga.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'passphrasethatidkforwhat',
      database: 'nestjs',
      entities: [Tag, VagaTag, Vaga, Usuario, Candidatura, Setor, Cargo],
      synchronize: true, //Disable on production
    }),
    UsuarioModule,
    VagaModule
  ],
})
export class DatabaseModule {}
