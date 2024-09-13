import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './module/usuario.module';
import {Tag} from './model/tag.entity';
import {VagaTag} from './model/vagatag.entity';
import Vaga from './model/vaga.entity';
import Candidatura from './model/candidatura.entity';
import Usuario from './model/usuario.entity';
import Setor from './model/setor.entity';
import Cargo from './model/cargo.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
