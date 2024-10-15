import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../model/usuario.entity';
import { UsuarioService } from '../service/usuario.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/autenticacao/Login.dto';
import { CreateUsuarioDto } from 'src/dto/usuarios/CreateUsuario.dto';
import { UpdateUsuarioDto } from 'src/dto/usuarios/UpdateUsuario.dto';
@Injectable()
export class AuthService {
  
  private saltRounds: number  = 10;
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async hashPassword(myPlaintextPassword: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(myPlaintextPassword, this.saltRounds);
      return hash;
    } catch (err) {
      throw new Error('Erro ao gerar o hash da senha');
    }
  }

  async comparePasswords(myPlaintextPassword: string, hash: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(myPlaintextPassword, hash);
      return result;
    } catch (err) {
      throw new Error('Erro ao comparar as senhas');
    }
  }

  async fetchUserFromDb(username: string): Promise<Usuario | null> {
    return this.usuarioService.findOneByName(username);
  }
 
  async register(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUser = this.usuariosRepository.create(createUsuarioDto);
    newUser.senhaHash = await this.hashPassword(newUser.senhaHash);
    return this.usuariosRepository.save(newUser);
  }

  async login(loginDto: LoginDto):Promise<{success: any, access_token: string, user?: Usuario}> {
    try{
      const user = await this.fetchUserFromDb(loginDto.username);
      
        if (!user) {
          throw new Error('Usuário não encontrado');
        }
      
        const match = await this.comparePasswords(loginDto.password, user.senhaHash);
      
        if (match) {
          // login
          const payload= { username: user.username, sub: user.id, email: user.email, nomeCompleto: user.nomeCompleto, cargo: user.cargo, setor: user.setor, vagas: user.vagas };
          const access_token = await this.jwtService.signAsync(payload);
  
          return { 
            success: true, 
            access_token: access_token, 
            user: {
              id: user.id,
              username: user.username,
              nomeCompleto: user.nomeCompleto,
              email: user.email,
              senhaHash: user.senhaHash,
              cargo: user.cargo,
              setor: user.setor,
              vagas: user.vagas
            }
          };
        }
        return { success: false, access_token: '' }
    }catch(err){
      throw new Error(err.message);
    }
  }

  async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario= await this.usuarioService.findOne(id);
    if(!usuario){
      throw new UnauthorizedException('Usuário não encontrado');
    }
    if (updateUsuarioDto.senhaHash) {
      updateUsuarioDto.senhaHash = await this.hashPassword(updateUsuarioDto.senhaHash);
    }
    Object.assign(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuario);
  }
}