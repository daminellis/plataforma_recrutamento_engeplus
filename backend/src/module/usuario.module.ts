import { Module } from "@nestjs/common";
import { UsuarioController } from "../controller/usuario.controller";
import { UsuarioService } from "../service/usuario.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import Usuario from "src/model/usuario.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService],
    controllers: [UsuarioController]
})
export class UsuarioModule{};