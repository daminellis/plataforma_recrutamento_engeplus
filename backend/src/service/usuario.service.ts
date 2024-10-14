import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/usuarios/CreateUsuario.dto';
import { UpdateUsuarioDto } from '../dto/usuarios/UpdateUsuario.dto';
import Usuario from '../model/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
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
  async findOneByName(username: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOneBy({username});
  }

  //Cria um usuário
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUser = this.usuariosRepository.create(createUsuarioDto);
    
    return this.usuariosRepository.save(newUser); // INSERT INTO usuarios
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