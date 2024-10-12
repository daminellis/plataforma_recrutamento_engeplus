import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Candidatura } from "../model/candidatura.entity";
import {CreateCandidaturaDto} from "../dto/candidaturas/CreateCandidatura.dto";
import {UpdateCandidaturaDto} from "../dto/candidaturas/UpdateCandidatura.dto";

@Injectable()
export class CandidaturaService {
    constructor(
        @InjectRepository(Candidatura)
        private candidaturaRepository: Repository<Candidatura>
    ) {}

    async findAllCandidaturas(): Promise<Candidatura[]> {
        return this.candidaturaRepository.find();
    }

    async findOneCandidatura(id: number): Promise<Candidatura | null> {
        return this.candidaturaRepository.findOneBy({id});
    }

    async create(createCandidaturaDto: CreateCandidaturaDto): Promise<Candidatura> {
        const newCandidatura = this.candidaturaRepository.create(createCandidaturaDto);
        return this.candidaturaRepository.save(newCandidatura);
    }

    async update(id: number, updateCandidaturaDto: UpdateCandidaturaDto): Promise<Candidatura> {
        const candidatura = await this.candidaturaRepository.findOneBy({id});
        if (!candidatura) {
            throw new NotFoundException('Candidatura não encontrada');
        }
        Object.assign(candidatura, updateCandidaturaDto);
        return this.candidaturaRepository.save(candidatura);
    }

    async delete(id: number): Promise<void> {
        const candidatura = await this.candidaturaRepository.findOneBy({id});
        if (!candidatura) {
            throw new NotFoundException('Candidatura não encontrada');
        }
        await this.candidaturaRepository.delete(id);
    }
}