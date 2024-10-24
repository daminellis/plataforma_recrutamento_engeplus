import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cargo } from "../model/cargo.entity";
import { CreateCargoDto } from "../dto/cargos/CreateCargo.dto";
import { UpdateCargoDto } from "../dto/cargos/UpdateCargo.dto";

@Injectable()
export class CargoService{
    constructor(@InjectRepository(Cargo)
    private cargosRepository: Repository<Cargo>,){}
    
    findAll(): Promise<Cargo[]>{
        return this.cargosRepository.find({
            relations: ['usuarios']
        });
    }

    findOne(id: number): Promise<Cargo | null>{
        return this.cargosRepository.findOne({
            where: { id },
            relations: ['usuarios']
        });
    }

    async create(createCargoDto: CreateCargoDto): Promise<Cargo>{
        const newCargo = this.cargosRepository.create(createCargoDto);
        return this.cargosRepository.save(newCargo);
    }

    async update(id: number, updateCargoDto: UpdateCargoDto): Promise<Cargo>{
        const cargo = await this.cargosRepository.findOneBy({id});
        if(!cargo){
            throw new NotFoundException('Cargo não encontrado');
        }
        Object.assign(cargo, updateCargoDto);
        return this.cargosRepository.save(cargo);
    }

    async delete(id: number): Promise<void>{
        const cargo = await this.cargosRepository.findOneBy({id});
        if(!cargo){
            throw new NotFoundException('Cargo não encontrado');
        }
        await this.cargosRepository.delete(id);
    }
};