import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../module/usuario.module'; // Importação do UsuarioModule
import Usuario from 'src/model/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]) ,forwardRef(() => UsuarioModule)], // Use forwardRef para evitar dependência circular
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}