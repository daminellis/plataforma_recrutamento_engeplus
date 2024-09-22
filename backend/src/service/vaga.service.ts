import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVagaDto } from '../dto/vagas/CreateVaga.dto';
import { UpdateVagaDto } from '../dto/vagas/UpdateVaga.dto';
import Vaga from '../model/vaga.entity';

@Injectable()
export class VagaService {
    constructor(
        @InjectRepository(Vaga)
        private vagasRepository: Repository<Vaga>, // Permite acessar os métodos do Repository
    ) { }

    // FUNÇÕES PARA O CRUD DE VAGAS
    
    //Get all vagas
    findAllVagas(): Promise<Vaga[]> {
        return this.vagasRepository.find(); // SELECT * FROM vagas
    }

    //Get one vaga
    findOneVaga(id: number): Promise<Vaga | null> {
        return this.vagasRepository.findOneBy({id}); // SELECT * FROM vagas WHERE id = ...
    }

    //Cria uma vaga
    async createVaga(createVagaDto: CreateVagaDto): Promise<Vaga> {
        const newVaga = this.vagasRepository.create(createVagaDto); // Prepara o objeto para ser inserido no banco
        // newVaga.dataExpiracao = new Date();
        return this.vagasRepository.save(newVaga); // INSERT INTO vagas
    }

    // Atualiza uma vaga
    async updateVaga(id: number, updateVagaDto: UpdateVagaDto): Promise<Vaga> {
        const vaga = await this.vagasRepository.findOneBy({id});
        if (!vaga) {
            throw new NotFoundException('Vaga não encontrada');
        }

        Object.assign(vaga, updateVagaDto);
        return this.vagasRepository.save(vaga); // UPDATE vagas SET ...
    }

    async deleteVaga(id: number): Promise<void> {
        const vaga = await this.vagasRepository.findOneBy({id});
        if (!vaga) {
            throw new NotFoundException('Vaga não encontrada');
        }
        await this.vagasRepository.delete(id); 
    }
};