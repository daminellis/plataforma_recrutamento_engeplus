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
import { CargoModule } from 'src/module/cargo.module';
import { CandidaturaModule } from 'src/module/candidatura.module';
import { AuthGuard } from './guards/auth.guard';
import { UserTypeGuard } from './guards/UserTypeGuard.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), UsuarioModule, SetorModule, VagaModule, CargoModule, CandidaturaModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '40m' },
  }),],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  },
  {
    provide: APP_GUARD,
    useClass: UserTypeGuard
  }

],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }