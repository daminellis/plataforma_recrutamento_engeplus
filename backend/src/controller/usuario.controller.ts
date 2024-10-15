import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { CreateUsuarioDto } from "../dto/usuarios/CreateUsuario.dto";
import{ UpdateUsuarioDto } from "../dto/usuarios/UpdateUsuario.dto";
import Usuario from "src/model/usuario.entity";
// import { LoginDto } from "src/dto/autenticacao/Login.dto";

@Controller('usuarios')
export class UsuarioController{
    constructor(private usuarioService: UsuarioService) {}
    @Get('/all')
    findAllUsuarios() {
        return this.usuarioService.findAll();
    }
    @Get('/find/:id')
    async findOneUsuario(@Param('id') id: number): Promise<Usuario | null> {
        return await this.usuarioService.findOne(id);
    }

    @Get('/findByName/:username') //Usar %20 em nomes compostos
    async findOneUsuarioByName(@Param('username') username: string): Promise<Usuario | null> {
        return await this.usuarioService.findOneByName(username);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        return await this.usuarioService.delete(id);
    }
}