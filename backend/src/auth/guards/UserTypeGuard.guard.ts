import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const tipoUsuario = request.user?.tipoUsuario;  // O 'AuthGuard' (arquivo auth.guard) coloca o payload no 'request.user'

    // Verifica se a rota exige algum tipo específico de usuário
    const allowedTypes = this.reflector.get<string[]>('allowedTypes', context.getHandler());
    
    if (!allowedTypes) {
      return true;  // Se não tiver restrição, permite o acesso
    }

    if (!allowedTypes.includes(tipoUsuario)) {
      throw new UnauthorizedException('Acesso negado. Tipo de usuário inválido.');
    }

    return true;  // Se o tipo de usuário for permitido, libera o acesso
  }
}