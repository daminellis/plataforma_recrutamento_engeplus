import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../module/usuario.module'; // Importação do UsuarioModule
import Usuario from 'src/model/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsuarioService } from 'src/service/usuario.service';
import { SetorService } from 'src/service/setor.service';
import { VagaService } from 'src/service/vaga.service';
import Setor from 'src/model/setor.entity';
import Vaga from 'src/model/vaga.entity';
import Cargo from 'src/model/cargo.entity';
import { CargoService } from 'src/service/cargo.service';
import Candidatura from 'src/model/candidatura.entity';
import { CandidaturaService } from 'src/service/candidatura.service';
import { VagaTagService } from 'src/service/vagatag.service';
import VagaTag from 'src/model/vagatag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Setor, Vaga, VagaTag, Cargo, Candidatura]), UsuarioModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '40m' },
  }),],
  providers: [AuthService, UsuarioService, SetorService, VagaService, CargoService, CandidaturaService, VagaTagService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }