
import { Body, Controller, Post, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/autenticacao/Login.dto';
import { CreateUsuarioDto } from 'src/dto/usuarios/CreateUsuario.dto';
import { create } from 'domain';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() loginDto: LoginDto) {
  //   return this.authService.checkUser(loginDto.username, loginDto.password);
  // }
  
  // @HttpCode(HttpStatus.OK)
  // @Post('register')
  // signUp(@Body() createUsuarioDto: CreateUsuarioDto) {
  //   return this.authService.registerUser(createUsuarioDto.username, createUsuarioDto.senhaHash);
  // }
}
