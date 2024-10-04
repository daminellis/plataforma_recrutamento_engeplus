import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../module/usuario.module'; // Importação do UsuarioModule
import Usuario from 'src/model/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]) ,forwardRef(() => UsuarioModule)], // Use forwardRef para evitar dependência circular
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}