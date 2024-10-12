import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setor } from '../model/setor.entity';
import { CreateSetorDto } from '../dto/setores/CreateSetor.dto';
import { UpdateSetorDto } from '../dto/setores/UpdateSetor.dto';

@Injectable()
export class SetorService {
    constructor(@InjectRepository(Setor)
    private setorRepository: Repository<Setor>,) {
    }

    // FUNÇÕES PARA O CRUD DE SETORES

    //Get all setores
    findAllSetores(): Promise<Setor[]> {
        return this.setorRepository.find(); // SELECT * FROM setores
    }

    //Get one setor
    findOneSetor(id: number): Promise<Setor | null> {
        return this.setorRepository.findOneBy({id}); // SELECT * FROM setores WHERE id = ...
    }

    //Cria um setor
    async createSetor(createSetorDto: CreateSetorDto): Promise<Setor> {
        const newSetor = this.setorRepository.create(createSetorDto); // Prepara o objeto para ser inserido no banco
        return this.setorRepository.save(newSetor); // INSERT INTO setores
    }

    // Atualiza um setor
    async updateSetor(id: number, updateSetorDto: UpdateSetorDto): Promise<Setor> {
        const setor = await this.setorRepository.findOneBy({id});
        if (!setor) {
            throw new NotFoundException('Setor não encontrado');
        }

        Object.assign(setor, updateSetorDto);
        return this.setorRepository.save(setor); // UPDATE setores SET ...
    }

    // Deleta um setor
    async deleteSetor(id: number): Promise<void> {
        const setor = await this.setorRepository.findOneBy({id});
        if (!setor) {
            throw new NotFoundException('Setor não encontrado');
        }
        await this.setorRepository.delete(id);
    }
};