import { Body, Controller, Post, Put, Param, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/autenticacao/Login.dto';
import { CreateUsuarioDto } from 'src/dto/usuarios/CreateUsuario.dto';
import Usuario from 'src/model/usuario.entity';
import { UpdateUsuarioDto } from 'src/dto/usuarios/UpdateUsuario.dto';
import { Public } from './decorators/public.decorator';
import { AllowUserTypes } from './decorators/AllowedUserTypes.decorator';
import { ResponseLoginDto } from 'src/dto/autenticacao/ResponseLogin.dto';
import { SuccessResponseDto } from 'src/dto/responses/SuccessResponse.dto';
import { ErrorResponseDto } from 'src/errors/dto/ErrorResponse.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  @AllowUserTypes('Administrador')
  async register(@Body() createUsuarioDto: CreateUsuarioDto): Promise<SuccessResponseDto> {
    return await this.authService.register(createUsuarioDto);
  }

  @Post('/login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<ResponseLoginDto> {
    return await this.authService.login(loginDto);
  }

  @Put('/update-usuario/:id')
  @AllowUserTypes('Administrador')
  async update(@Param("id") id: number, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<SuccessResponseDto> {
    return await this.authService.updateUsuario(id, updateUsuarioDto);
  }

  @Get('/token-validation')
  @Public()
  async tokenValidation(@Query('token') token: any): Promise<{ access: boolean, token: string }> {
    return await this.authService.tokenValidation(token);
  }

}
