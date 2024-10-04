import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { CreateUsuarioDto } from "../dto/usuarios/CreateUsuario.dto";
import{ UpdateUsuarioDto } from "../dto/usuarios/UpdateUsuario.dto";
import Usuario from "src/model/usuario.entity";
import { LoginDto } from "src/dto/autenticacao/Login.dto";

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

    @Post('/create')
    async createUsuario(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        return await this.usuarioService.create(createUsuarioDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<{success: any, access_token: string}> {
        return await this.usuarioService.login(loginDto);
    }

    @Put('/update/:id')
    async update(@Param("id") id: number, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        return await this.usuarioService.update(id, updateUsuarioDto);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        return await this.usuarioService.delete(id);
    }
}