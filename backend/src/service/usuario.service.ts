import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Usuario, { TipoUsuarioEnum } from '../model/usuario.entity';
import { UpdateUsuarioDto } from '../dto/usuarios/UpdateUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) { }

  async getEnum(): Promise<{tipoUsuario: typeof TipoUsuarioEnum}>{
    return {tipoUsuario: TipoUsuarioEnum};
  }

  // FUNÇÕES PARA O CRUD DE USUÁRIOS
  //Econtra todos os usuários
  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find({
      select: ['id', 'username', 'nomeCompleto', 'email', 'tipoUsuario'],
      relations: ['cargo', 'setor', 'vagas']
    });
  }
  //Encontra um usuário por ID
  async findOne(id: number): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({
      where: { id },
      select: ['id', 'username', 'nomeCompleto', 'email', 'tipoUsuario'],
      relations: ['cargo', 'setor', 'vagas']
    });
  }

  //Encontra um usuário por username
  async findOneByUsername(username: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({
      where: { username },
      relations: ['cargo', 'setor', 'vagas']
    });
  }

    //Atualiza um usuário
    async update(id: number, usuario: UpdateUsuarioDto): Promise<Usuario> {
        const usuarioExistente = await this.usuariosRepository.findOneBy({ id });
        if (!usuarioExistente) {
            throw new NotFoundException('Usuário não encontrado');
        }
        if (usuario.username) {
            const usuarioComMesmoUsername = await this.usuariosRepository.findOneBy({ username: usuario.username });
            if (usuarioComMesmoUsername && usuarioComMesmoUsername.id !== id) {
            throw new BadRequestException('Username já está em uso');
            }
        }
        await this.usuariosRepository.update(id, usuario);
        return { ...usuarioExistente, ...usuario };
        }

  async delete(id: number): Promise<void> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.usuariosRepository.delete(id);
  }

}