import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVagaDto } from '../dto/vagas/CreateVaga.dto';
import { UpdateVagaDto } from '../dto/vagas/UpdateVaga.dto';
import Vaga from '../model/vaga.entity';
import { dateFormater } from '../utils/functions/dateFormater';
import { CandidaturaService } from './candidatura.service';
import { SetorService } from './setor.service';
import { UsuarioService } from './usuario.service';
import { TagService } from './tag.service';
@Injectable()
export class VagaService {
  constructor(
    @InjectRepository(Vaga)
    private vagasRepository: Repository<Vaga>, // Permite acessar os métodos do Repository
    private usuarioService: UsuarioService,
    private setorService: SetorService,
    private candidaturaService: CandidaturaService,
    private tagService: TagService,
  ) { 
  }

  // FUNÇÕES PARA O CRUD DE VAGAS

  //Get all vagas
  async findAllVagas(): Promise<Vaga[]> {
    const vagas = await this.vagasRepository.find({
      select: ['id', 'titulo', 'salarioMinimo', 'salarioMaximo', 'regiao', 'dataPostagem'],
      relations: ['setor', 'tags'],
    }); // SELECT * FROM vagas
    
    return vagas;
  }

  async findVagasDisponiveis(): Promise<Vaga[] | null> {
    const vagas = await this.vagasRepository.find(); // SELECT * FROM vagas
  
    const vagasDisponiveis = vagas.filter(vaga => vaga.disponivel === true);
  
    return vagasDisponiveis.length > 0 ? vagasDisponiveis : null;
  }
  //Get one vaga
  async findOneVaga(id: number): Promise<Vaga | null> {
    const vaga = await this.vagasRepository.findOne({
      where: { id },
      select: ['id', 'titulo', 'salarioMinimo', 'salarioMaximo','educacao', 'tempoExperiencia', 'nivelExperiencia', 'modalidade', 'quantidadeVagas', 'dataExpiracao', 'descricao', 'responsabilidades', 'regiao', 'dataPostagem'],
      relations: ['recrutador', 'setor', 'tags', 'candidatura'],
    }); // SELECT * FROM vagas WHERE id = ...

    return vaga;
  }

  //Cria uma vaga
  async createVaga(createVagaDto: CreateVagaDto): Promise<Vaga> {
    const newVaga = this.vagasRepository.create(createVagaDto);
    if (newVaga.dataExpiracao) {
      newVaga.dataExpiracao = new Date(
        dateFormater(createVagaDto.dataExpiracao),
      );
    }

    if (createVagaDto.recruiterId) {
      const recruiter = await this.usuarioService.findOne(
        createVagaDto.recruiterId,
      );
      if (recruiter) {
        newVaga.recrutador = recruiter;
      }else{
        throw new NotFoundException('Recrutador não encontrado');
      }
    }
    if (createVagaDto.setorId) {
      const sector = await this.setorService.findOneSetor(createVagaDto.setorId);
      if (sector) {
        newVaga.setor = sector;
      }else{
        throw new NotFoundException('Setor não encontrado');
      }
    }

    if (createVagaDto.candidaturaIds){
      newVaga.candidatura= [];
      for (let i = 0; i < createVagaDto.candidaturaIds.length; i++) {
        const candidaturas = await this.candidaturaService.findOneCandidatura(createVagaDto.candidaturaIds[i]);
        if (candidaturas) {
          newVaga.candidatura.push(candidaturas);
        } else {
          throw new Error(`Vaga ${createVagaDto.candidaturaIds[i]} não encontrada. Favor atribuir uma vaga válida.`);
        }
      }
    }

    if (createVagaDto.tagIds){
      newVaga.tags= [];
      for (let i = 0; i < createVagaDto.tagIds.length; i++) {
        const tags = await this.tagService.findOneTag(createVagaDto.tagIds[i]);
        if (tags) {
          newVaga.tags.push(tags);
        } else {
          throw new Error(`Tag(s) ${createVagaDto.tagIds[i]} não encontrada(s). Favor atribuir uma tag válida.`);
        }
      }
    }
    return this.vagasRepository.save(newVaga); // INSERT INTO vagas
  }
  

  // Atualiza uma vaga
  async updateVaga(id: number, updateVagaDto: UpdateVagaDto): Promise<Vaga> {
    const vaga = await this.vagasRepository.findOneBy({ id });
    if (!vaga) {
      throw new NotFoundException('Vaga não encontrada');
    }
    if (updateVagaDto.dataExpiracao) {
      updateVagaDto.dataExpiracao = dateFormater(updateVagaDto.dataExpiracao);
    }

    if (updateVagaDto.recruiterId) {
      const recruiter = await this.usuarioService.findOne(
        updateVagaDto.recruiterId,
      );
      
      if (recruiter) {
        vaga.recrutador = recruiter;
      }else{
        throw new NotFoundException('Recrutador não encontrado');
      }
    }
    if (updateVagaDto.setorId) {
      const sector = await this.setorService.findOneSetor(updateVagaDto.setorId);
      if (sector) {
        vaga.setor = sector;
      }else{
        throw new NotFoundException('Setor não encontrado');
      }
    }

    if (updateVagaDto.tagIds){
      vaga.tags= [];
      for (let i = 0; i < updateVagaDto.tagIds.length; i++) {
        const tags = await this.tagService.findOneTag(updateVagaDto.tagIds[i]);
        if (tags) {
          vaga.tags.push(tags);
        } else {
          throw new Error(`Tag(s) ${updateVagaDto.tagIds[i]} não encontrada(s). Favor atribuir uma tag válida.`);
        }
      }
    }

    Object.assign(vaga, updateVagaDto);
    return this.vagasRepository.save(vaga); // UPDATE vagas SET ...
  }

  async deleteVaga(id: number): Promise<void> {
    const vaga = await this.vagasRepository.findOneBy({ id });
    if (!vaga) {
      throw new NotFoundException('Vaga não encontrada');
    }
    await this.vagasRepository.delete(id);
  }

  async deleteAllNullVagas(): Promise<void> {

    const vagas = await this.vagasRepository.find({ relations: ["setor"] });

    const vagasNull = vagas.filter(vaga => vaga.setor === null);

    for (let i = 0; i < vagasNull.length; i++) {
        await this.vagasRepository.delete(vagasNull[i].id);
        console.log(`Vaga com id ${vagasNull[i].id} excluída`);
    }
}
}
