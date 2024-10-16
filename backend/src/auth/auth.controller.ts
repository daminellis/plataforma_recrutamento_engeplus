import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards, Get, Put, Param } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from 'src/dto/autenticacao/Login.dto';
import { CreateUsuarioDto } from 'src/dto/usuarios/CreateUsuario.dto';
import Usuario from 'src/model/usuario.entity';
import { UpdateUsuarioDto } from 'src/dto/usuarios/UpdateUsuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.authService.register(createUsuarioDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ success: any, access_token: string }> {
    return await this.authService.login(loginDto);
  }

  @Put('/update-usuario/:id')
  async update(@Param("id") id: number, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    return await this.authService.updateUsuario(id, updateUsuarioDto);
  }

}
