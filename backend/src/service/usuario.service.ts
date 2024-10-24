import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Usuario from '../model/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) { }

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
  async findOneByName(username: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({
      where: { username },
      relations: ['cargo', 'setor', 'vagas']
    });
  }
  async delete(id: number): Promise<void> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.usuariosRepository.delete(id);
  }

}