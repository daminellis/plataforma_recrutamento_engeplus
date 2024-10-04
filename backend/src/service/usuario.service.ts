import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/usuarios/CreateUsuario.dto';
import { UpdateUsuarioDto } from '../dto/usuarios/UpdateUsuario.dto';
import Usuario from '../model/usuario.entity';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/dto/autenticacao/Login.dto';
import { JwtService } from '@nestjs/jwt';

export type User = any;
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>, // Permite acessar os métodos do Repository
    private authService: AuthService,
    private jwtService: JwtService
  ) { }

  // FUNÇÕES PARA O CRUD DE USUÁRIOS
  //Econtra todos os usuários
  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find(); // SELECT * FROM usuarios
  }
  //Encontra um usuário
  findOne(id: number): Promise<Usuario | null> {
    return this.usuariosRepository.findOneBy({ id }); // SELECT * FROM usuarios WHERE id = ...
  }
  async findOneByName(username: string): Promise<User | undefined> {
    return this.usuariosRepository.findOneBy({username});
  }

  //Cria um usuário
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUser = this.usuariosRepository.create(createUsuarioDto);
    newUser.senhaHash = await this.authService.hashPassword(createUsuarioDto.senhaHash);
    return this.usuariosRepository.save(newUser); // INSERT INTO usuarios
  }

  async login(loginDto: LoginDto):Promise<{success: any, access_token: string, user?: Usuario}> {
    try{
      const user = await this.findOneByName(loginDto.username);
      
        if (!user) {
          throw new Error('Usuário não encontrado');
        }
      
        const match = await this.authService.comparePasswords(loginDto.password, user.senhaHash);
      
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

   // Atualiza um usuário
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    Object.assign(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuario); // UPDATE usuarios SET ...
  }

  async delete(id: number): Promise<void> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.usuariosRepository.delete(id); 
  }

}