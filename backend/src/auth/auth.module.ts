import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../module/usuario.module'; // Importação do UsuarioModule
import Usuario from 'src/model/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]) ,forwardRef(() => UsuarioModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),], 
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}