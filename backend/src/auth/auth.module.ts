import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/module/usuario.module';
import { Usuario } from 'src/model/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), UsuarioModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}