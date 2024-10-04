
import { Body, Controller, Post, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/autenticacao/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    const isUserValid = await this.authService.checkUser(loginDto.username, loginDto.password);
    if (!isUserValid) {
      throw new BadRequestException('Credenciais inválidas');
    }
    return { message: 'Login realizado com sucesso' };
  }
}
