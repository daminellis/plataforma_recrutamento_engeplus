import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setor } from '../model/setor.entity';
import { CreateSetorDto } from '../dto/setores/CreateSetor.dto';
import { UpdateSetorDto } from '../dto/setores/UpdateSetor.dto';
import { SuccessResponseDto } from 'src/dto/responses/SuccessResponse.dto';
import { CustomHttpException } from 'src/errors/exceptions/custom-exceptions';

@Injectable()
export class SetorService {
    constructor(@InjectRepository(Setor)
    private setorRepository: Repository<Setor>,
    ) {
    }

    // FUNÇÕES PARA O CRUD DE SETORES

    //Get all setores
    findAllSetores(): Promise<Setor[]> {
        return this.setorRepository.find(); // SELECT * FROM setores
    }

    //Get one setor
    findOneSetor(id: number): Promise<Setor | null> {
        return this.setorRepository.findOneBy({ id }); // SELECT * FROM setores WHERE id = ...
    }

    //Cria um setor
    async create(createSetorDto: CreateSetorDto): Promise<SuccessResponseDto> {
        try {
            const newSetor = this.setorRepository.create(createSetorDto); // Prepara o objeto para ser inserido no banco
            await this.setorRepository.save(newSetor);

            return {success: true, code: HttpStatus.CREATED, message: 'Setor criado com sucesso'} as SuccessResponseDto;
        } catch (err) {
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }// INSERT INTO setores
    }

    // Atualiza um setor
    async update(id: number, updateSetorDto: UpdateSetorDto): Promise<SuccessResponseDto> {
        try{

            const setor = await this.setorRepository.findOneBy({ id });
            if (!setor) {
                throw new NotFoundException('Setor não encontrado');
            }
    
            Object.assign(setor, updateSetorDto);
            await this.setorRepository.save(setor); // UPDATE setores SET ...

            return {success: true, code: HttpStatus.OK, message: 'Setor atualizado com sucesso'} as SuccessResponseDto;
        }catch(err){
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    // Deleta um setor
    async delete(id: number): Promise<void> {
        const setor = await this.setorRepository.findOneBy({ id });
        if (!setor) {
            throw new NotFoundException('Setor não encontrado');
        }
        await this.setorRepository.delete(id);
    }
};