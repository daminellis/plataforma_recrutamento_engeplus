import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cargo } from "../model/cargo.entity";
import { CreateCargoDto } from "../dto/cargos/CreateCargo.dto";
import { UpdateCargoDto } from "../dto/cargos/UpdateCargo.dto";
import { SuccessResponseDto } from "src/dto/responses/SuccessResponse.dto";
import { CustomHttpException } from "src/errors/exceptions/custom-exceptions";

@Injectable()
export class CargoService {
    constructor(@InjectRepository(Cargo)
    private cargosRepository: Repository<Cargo>,) { }

    findAll(): Promise<Cargo[]> {
        return this.cargosRepository.find();
    }

    findOne(id: number): Promise<Cargo | null> {
        return this.cargosRepository.findOne({
            where: { id },
            relations: ['usuarios']
        });
    }

    async create(createCargoDto: CreateCargoDto): Promise<SuccessResponseDto> {
        try {
            const newCargo = this.cargosRepository.create(createCargoDto);
            await this.cargosRepository.save(newCargo);

            return {
                success: true,
                code: HttpStatus.CREATED,
                message: 'Cargo criado com sucesso',
            } as SuccessResponseDto;
        } catch (err) {
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }

    }

    async update(id: number, updateCargoDto: UpdateCargoDto): Promise<SuccessResponseDto> {
        try {
            const cargo = await this.cargosRepository.findOneBy({ id });
            if (!cargo) {
                throw new NotFoundException('Cargo não encontrado');
            }
            Object.assign(cargo, updateCargoDto);
            await this.cargosRepository.save(cargo);

            return {
                success: true,
                code: HttpStatus.OK,
                message: 'Cargo atualizado com sucesso',
            } as SuccessResponseDto;
            
        } catch (err) {
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number): Promise<void> {
        const cargo = await this.cargosRepository.findOneBy({ id });
        if (!cargo) {
            throw new NotFoundException('Cargo não encontrado');
        }
        await this.cargosRepository.delete(id);
    }
};