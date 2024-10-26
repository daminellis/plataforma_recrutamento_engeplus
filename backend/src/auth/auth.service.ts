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
import { SetorService } from 'src/service/setor.service';
import { VagaService } from 'src/service/vaga.service';
import { ResponseLoginDto } from 'src/dto/autenticacao/ResponseLogin.dto';
import { CargoService } from 'src/service/cargo.service';
import { Token } from 'nodemailer/lib/xoauth2';
@Injectable()
export class AuthService {
  
  private saltRounds: number  = 10;
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private usuarioService: UsuarioService,
    private setorService: SetorService,
    private vagaService: VagaService,
    private cargoService: CargoService,
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
    
    if (createUsuarioDto.cargoId){
      const cargo= await this.cargoService.findOne(createUsuarioDto.cargoId);
      if(cargo){
        newUser.cargo = {id: cargo.id, nome: cargo.nome, descricao: cargo.descricao} as any;
      }else{
        throw new Error(`Cargo ${createUsuarioDto.cargoId} não encontrado. Favor atribuir um cargo válido.`);
      }
    }
    
    if (createUsuarioDto.setorId) {
      const setor = await this.setorService.findOneSetor(createUsuarioDto.setorId);
      if (setor){
        newUser.setor = setor;
      }else{
        throw new Error(`Setor ${createUsuarioDto.setorId} não encontrado. Favor atribuir um setor válido.`);
      }
    }

    if (createUsuarioDto.vagaIds) {
      newUser.vagas = [];
      for (let i = 0; i < createUsuarioDto.vagaIds.length; i++) {
        const vaga = await this.vagaService.findOneVaga(createUsuarioDto.vagaIds[i]);
        if (vaga) {
          newUser.vagas.push({id: vaga.id, titulo: vaga.titulo} as any);
        } else {
          throw new Error(`Vaga ${createUsuarioDto.vagaIds[i]} não encontrada. Favor atribuir uma vaga válida.`);
        }
      }
    } 
    return this.usuariosRepository.save(newUser);
  }

  async login(loginDto: LoginDto):Promise<{success: any, access_token: string, user?: ResponseLoginDto}> {
    try{
      const user = await this.fetchUserFromDb(loginDto.username);
      
        if (!user) {
          throw new Error('Usuário não encontrado');
        }
      
        const match = await this.comparePasswords(loginDto.password, user.senhaHash);
      
        if (match) {
          // login
          const payload= { username: user.username, sub: user.id, email: user.email, nomeCompleto: user.nomeCompleto, tipoUsuario: user.tipoUsuario, iat: Math.floor(Date.now() / 1000) };
          const access_token = await this.jwtService.signAsync(payload);
          console.log(payload)
          return { 
            success: true, 
            access_token: access_token, 
            user: {
              id: user.id,
              username: user.username,
              nomeCompleto: user.nomeCompleto,
              email: user.email,
              cargo: user.cargo.nome,
              setor: user.setor.nome,
              vagas: {
                vagaIds: user.vagas.map(vaga => vaga.id),
                vagaNames: user.vagas.map(vaga => vaga.titulo)
              },
              tipoUsuario: user.tipoUsuario
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

    if (updateUsuarioDto.cargoId){
      const cargo= await this.cargoService.findOne(updateUsuarioDto.cargoId);
      if(cargo){
        usuario.cargo = cargo;
      }else{
        throw new Error(`Cargo ${updateUsuarioDto.cargoId} não encontrado. Favor atribuir um cargo válido.`);
      }
    }
    
    if (updateUsuarioDto.setorId) {
      const setor = await this.setorService.findOneSetor(updateUsuarioDto.setorId);
      if (setor){
        usuario.setor = setor;
      }else{
        throw new Error(`Setor ${updateUsuarioDto.setorId} não encontrado. Favor atribuir um setor válido.`);
      }
    }

    if (updateUsuarioDto.vagaIds) {
      usuario.vagas = [];
      for (let i = 0; i < updateUsuarioDto.vagaIds.length; i++) {
        const vaga = await this.vagaService.findOneVaga(updateUsuarioDto.vagaIds[i]);
        if (vaga) {
          usuario.vagas.push(vaga);
        } else {
          throw new Error(`Vaga ${updateUsuarioDto.vagaIds[i]} não encontrada. Favor atribuir uma vaga válida.`);
        }
      }
    } 
    Object.assign(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuario);
  }


  async tokenValidation(token: string): Promise<{access:boolean, token: string}> {
    try {
      if (typeof token !== 'string') {
        throw new Error('Token must be a string');
      }
  
      const payload = await this.jwtService.verifyAsync(token);
      console.log('Payload:', payload);
  
      const currentTime = Math.floor(Date.now() / 1000);
      const fortyMinutesInSeconds = 40 * 60;
      console.log('Current Time:', currentTime);
      console.log('Token Issued At:', payload.iat);
      console.log('Time Difference:', currentTime - payload.iat);
  
      if (payload.iat && (currentTime - payload.iat) > fortyMinutesInSeconds) {
        return {access: false, token: ''};
      } else {
        return {access: true, token: token};
      }
    } catch (err) {
      console.error('Token validation error:', err);
      return {access: false, token: ''};
    }
  }
}