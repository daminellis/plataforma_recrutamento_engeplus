
import { Body, Controller, Post, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/autenticacao/Login.dto';
import { CreateUsuarioDto } from 'src/dto/usuarios/CreateUsuario.dto';
import Usuario from 'src/model/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() createUsuarioDto:CreateUsuarioDto): Promise<Usuario> {
    return await this.authService.register(createUsuarioDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ success: any, access_token: string }> {
    return await this.authService.login(loginDto);
  }
}
