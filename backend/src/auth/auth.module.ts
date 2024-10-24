import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../module/usuario.module'; // Importação do UsuarioModule
import Usuario from 'src/model/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SetorModule } from 'src/module/setor.module';
import { VagaModule } from 'src/module/vaga.module';
import { VagaTagModule } from 'src/module/vagatag.module';
import { CargoModule } from 'src/module/cargo.module';
import { CandidaturaModule } from 'src/module/candidatura.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), UsuarioModule, SetorModule, VagaModule, VagaTagModule, CargoModule, CandidaturaModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '40m' },
  }),],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }