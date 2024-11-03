import { Body, Controller, Post, Put, Param, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/autenticacao/Login.dto';
import { CreateUsuarioDto } from 'src/dto/usuarios/CreateUsuario.dto';
import Usuario from 'src/model/usuario.entity';
import { UpdateUsuarioDto } from 'src/dto/usuarios/UpdateUsuario.dto';
import { Public } from './decorators/public.decorator';
import { AllowUserTypes } from './decorators/AllowedUserTypes.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  @AllowUserTypes('Administrador')
  async register(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.authService.register(createUsuarioDto);
  }

  @Post('/login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<{ success: any, access_token: string }> {
    return await this.authService.login(loginDto);
  }

  @Put('/update-usuario/:id')
  @AllowUserTypes('Administrador')
  async update(@Param("id") id: number, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    return await this.authService.updateUsuario(id, updateUsuarioDto);
  }

  @Get('/token-validation')
  @Public()
  async tokenValidation(@Query('token') token: any): Promise<{ access: boolean, token: string }> {
    return await this.authService.tokenValidation(token);
  }

}
