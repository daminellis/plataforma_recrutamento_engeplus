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
import { tempoPostado } from 'src/utils/functions/dateCounter';
@Injectable()
export class VagaService {
  constructor(
    @InjectRepository(Vaga)
    private vagasRepository: Repository<Vaga>, // Permite acessar os métodos do Repository
  ) {}

  // FUNÇÕES PARA O CRUD DE VAGAS

  //Get all vagas
  findAllVagas(): Promise<Vaga[]> {
    return this.vagasRepository.find(); // SELECT * FROM vagas
  }

  //Get one vaga
  findOneVaga(id: number): Promise<Vaga | null> {
    return this.vagasRepository.findOneBy({ id }); // SELECT * FROM vagas WHERE id = ...
  }

  //Cria uma vaga
  async createVaga(createVagaDto: CreateVagaDto): Promise<Vaga> {
    const newVaga = this.vagasRepository.create(createVagaDto);
    if (newVaga.dataExpiracao) {
      newVaga.dataExpiracao = new Date(
        dateFormater(createVagaDto.dataExpiracao),
      );
    }
    newVaga.dataPostagem = new Date();
    // Ensure dataPostagem is set before calling tempoPostado
    if (newVaga.dataPostagem) {
      newVaga.tempoPostado = tempoPostado(newVaga.dataPostagem);
    }

    // if (newVaga.dataPostagem){
    //     newVaga.dataPostagem = new Date(dateFormater(createVagaDto.dataPostagem));
    // }

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
