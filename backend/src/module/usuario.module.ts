import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from 'src/model/usuario.entity';
import { UsuarioController } from 'src/controller/usuario.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService, ],
  exports: [UsuarioService],
})
export class UsuarioModule {}