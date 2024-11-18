import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { CustomHttpException } from '../errors/exceptions/custom-exceptions';
import { SuccessResponseDto } from 'src/dto/responses/SuccessResponse.dto';
import { R } from '@faker-js/faker/dist/airline-BLb3y-7w';
import { ErrorResponseDto } from 'src/errors/dto/ErrorResponse.dto';

@Injectable()
export class AuthService {

  private saltRounds: number = 10;
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private usuarioService: UsuarioService,
    private setorService: SetorService,
    private vagaService: VagaService,
    private cargoService: CargoService,
    private jwtService: JwtService
  ) { }

  async hashPassword(myPlaintextPassword: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(myPlaintextPassword, this.saltRounds);
      return hash;
    } catch (err) {
      throw new CustomHttpException('Erro ao gerar o hash da senha', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async comparePasswords(myPlaintextPassword: string, hash: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(myPlaintextPassword, hash);
      return result;
    } catch (err) {
      throw new CustomHttpException('Erro ao comparar as senhas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchUserFromDb(username: string): Promise<Usuario | null> {
    return this.usuarioService.findOneByUsername(username);
  }

  async register(createUsuarioDto: CreateUsuarioDto): Promise<SuccessResponseDto> {
    try {
      const newUser = this.usuariosRepository.create(createUsuarioDto);
      newUser.senha = await this.hashPassword(newUser.senha);

      if (createUsuarioDto.cargoId) {
        const cargo = await this.cargoService.findOne(createUsuarioDto.cargoId);
        if (cargo) {
          newUser.cargo = { id: cargo.id, nome: cargo.nome, descricao: cargo.descricao } as any;
        } else {
          throw new CustomHttpException(`Cargo ${createUsuarioDto.cargoId} não encontrado. Favor atribuir um cargo válido.`, HttpStatus.BAD_REQUEST);
        }
      }

      if (createUsuarioDto.setorId) {
        const setor = await this.setorService.findOneSetor(createUsuarioDto.setorId);
        if (setor) {
          newUser.setor = setor;
        } else {
          throw new CustomHttpException(`Setor ${createUsuarioDto.setorId} não encontrado. Favor atribuir um setor válido.`, HttpStatus.BAD_REQUEST);
        }
      }

      await this.usuariosRepository.save(newUser);
      return { success: true, code: HttpStatus.CREATED, message: 'Usuário criado com sucesso' } as SuccessResponseDto;

    } catch (err) {
      throw new CustomHttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginDto: LoginDto): Promise<ResponseLoginDto> {

    try {
      const user = await this.fetchUserFromDb(loginDto.username);
      const match = user && await this.comparePasswords(loginDto.password, user.senha);

      if (!user || !match) {
        throw new UnauthorizedException('Credenciais incorretas');
      }

      if (match) {
        // login
        const payload = { username: user.username, sub: user.id, email: user.email, nomeCompleto: user.nomeCompleto, tipoUsuario: user.tipoUsuario, iat: Math.floor(Date.now() / 1000) };
        const token = await this.jwtService.signAsync(payload);

        const routes: any[] = [

          //VAGAS
          { route: '/vagas/enums', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
          { route: '/vagas/all', hasAccess: true }, //Pública
          { route: '/vagas/all-private', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
          { route: '/vagas/create', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/vagas/update/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/vagas/delete/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },

          //USUARIOS/AUTH
          { route: '/auth/register', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/auth/login', hasAccess: true }, //Pública
          { route: '/auth/update-usuario/:id', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/auth/token-validation', hasAccess: true },

          { route: '/usuarios/enum', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/usuarios/all', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/usuarios/find/:id', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/usuarios/findByName/:username', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/usuarios/delete/:id', hasAccess: user.tipoUsuario === 'Administrador' },

          //CANDIDATURAS
          { route: '/candidaturas/enum', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
          { route: '/candidaturas/all', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
          { route: '/candidaturas/find/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
          { route: '/candidaturas/find/all-by-vaga/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
          { route: '/candidaturas/create', hasAccess: true }, // Pública
          { route: '/candidaturas/update/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/candidaturas/delete/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },


          //SETORES
          { route: '/setores/all', hasAccess: true }, //Pública
          { route: '/setores/find/:id', hasAccess: true }, //Pública
          { route: '/setores/create', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/setores/update/:id', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/setores/delete/:id', hasAccess: user.tipoUsuario === 'Administrador' },

          //CARGOS
          { route: '/cargos/all', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/cargos/find/:id', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/cargos/create', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/cargos/update/:id', hasAccess: user.tipoUsuario === 'Administrador' },
          { route: '/cargos/delete/:id', hasAccess: user.tipoUsuario === 'Administrador' },

          //VAGA TAGS
          { route: '/tags/all', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' }, //Pública
          { route: '/tags/find/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' }, //Pública
          { route: '/tags/create', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/tags/update/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/tags/delete/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },

          //CANDIDATURA TAGS
          { route: '/candidaturatags/all', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/candidaturatags/find/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/candidaturatags/create', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/candidaturatags/update/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/candidaturatags/delete/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },


          //BANCO DE TALENTOS
          { route: '/bancotalentos/all', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
          { route: '/bancotalentos/find/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
          { route: '/bancotalentos/create', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
          // { route: '/bancotalentos/update/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' },
          { route: '/bancotalentos/delete/:id', hasAccess: user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Recursos Humanos' || user.tipoUsuario === 'Líder' },
        ];

        return {
          success: true,
          access_token: token,
          routes: routes

        } as ResponseLoginDto;
      }
      return { success: false, access_token: '', routes: [] } as ResponseLoginDto;
    } catch (err) {
      throw new CustomHttpException('Senha ou nome de usuário incorreto, verifique suas credenciais.', HttpStatus.UNAUTHORIZED)
    }
  }

  async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<SuccessResponseDto> {
    try{

      const usuario = await this.usuarioService.findOne(id);
      if (!usuario) {
        throw new UnauthorizedException('Usuário não encontrado');
      }
  
      if (updateUsuarioDto.senha) {
        updateUsuarioDto.senha = await this.hashPassword(updateUsuarioDto.senha);
      }
  
      if (updateUsuarioDto.cargoId) {
        const cargo = await this.cargoService.findOne(updateUsuarioDto.cargoId);
        if (cargo) {
          usuario.cargo = cargo;
        } else {
          throw new CustomHttpException(`Cargo ${updateUsuarioDto.cargoId} não encontrado. Favor atribuir um cargo válido.`, HttpStatus.BAD_REQUEST);
        }
      }
  
      if (updateUsuarioDto.setorId) {
        const setor = await this.setorService.findOneSetor(updateUsuarioDto.setorId);
        if (setor) {
          usuario.setor = setor;
        } else {
          throw new CustomHttpException(`Setor ${updateUsuarioDto.setorId} não encontrado. Favor atribuir um setor válido.`, HttpStatus.BAD_REQUEST);
        }
      }
  
      if (updateUsuarioDto.vagaIds) {
        usuario.vagas = [];
        for (let i = 0; i < updateUsuarioDto.vagaIds.length; i++) {
          const vaga = await this.vagaService.findOneVaga(updateUsuarioDto.vagaIds[i]);
          if (vaga) {
            usuario.vagas.push(vaga);
          } else {
            throw new CustomHttpException(`Vaga ${updateUsuarioDto.vagaIds[i]} não encontrada. Favor atribuir uma vaga válida.`, HttpStatus.BAD_REQUEST);
          }
        }
      }
      Object.assign(usuario, updateUsuarioDto);
      await this.usuariosRepository.save(usuario);

      return {success: true, code: HttpStatus.OK, message: 'Usuário atualizado com sucesso' } as SuccessResponseDto;
      
    }catch(err){
      throw new CustomHttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async tokenValidation(token: string): Promise<{ access: boolean, token: string }> {
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
        return { access: false, token: '' };
      } else {
        return { access: true, token: token };
      }
    } catch (err) {
      console.error('Token validation error:', err);
      return { access: false, token: '' };
    }
  }
}