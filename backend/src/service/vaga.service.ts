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
@Injectable()
export class VagaService {
  constructor(
    @InjectRepository(Vaga)
    private vagasRepository: Repository<Vaga>, // Permite acessar os métodos do Repository
  ) { 
  }

  // FUNÇÕES PARA O CRUD DE VAGAS

  //Get all vagas
  async findAllVagas(): Promise<Vaga[]> {
    const vagas = await this.vagasRepository.find({
      select: ['id', 'titulo', 'salarioMinimo', 'salarioMaximo', 'regiao', 'dataPostagem'],
      relations: ['setor, vagatag'],
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
      relations: ['recrutador', 'setor', 'candidatura', 'vagatag'],
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
}
