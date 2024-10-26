import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Candidatura } from "../model/candidatura.entity";
import {CreateCandidaturaDto} from "../dto/candidaturas/CreateCandidatura.dto";
import {UpdateCandidaturaDto} from "../dto/candidaturas/UpdateCandidatura.dto";
import { VagaService } from "./vaga.service";
import { CandidaturaTagService } from "./candidaturatag.service";

@Injectable()
export class CandidaturaService {
    constructor(
        @InjectRepository(Candidatura)
        private candidaturaRepository: Repository<Candidatura>,
        private candidaturaTagService: CandidaturaTagService,
        @Inject(forwardRef(() => VagaService)) private readonly vagaService: VagaService
    ) {}

    async findAllCandidaturas(): Promise<Candidatura[]> {
        return this.candidaturaRepository.find({
            select: ['id', 'nomeCompleto', 'email', 'telefone', 'descricao', 'favorito', 'dataCandidatura' ],
            relations: ['vaga', 'status']
        });
    }

    async findOneCandidatura(id: number): Promise<Candidatura | null> {
        return this.candidaturaRepository.findOne({
            where: { id },
            relations: ['vaga', 'status']
        });
    }

    async findAllByCandidature(vagaId: number): Promise<Candidatura[] | null>{
        const candidatosPorVaga: Candidatura[] = await this.vagaService.findAllCandidaturasByVaga(vagaId);

        return candidatosPorVaga
    }

    async create(createCandidaturaDto: CreateCandidaturaDto): Promise<Candidatura> {
        const newCandidatura = this.candidaturaRepository.create(createCandidaturaDto);
        
        if (createCandidaturaDto.vagaId){
            const vaga = await this.vagaService.findOneVaga(parseInt(createCandidaturaDto.vagaId));
            if (!vaga) {
                throw new NotFoundException('Vaga não encontrada');
            }
            newCandidatura.vaga = {id: vaga.id, titulo: vaga.titulo} as any;
        }
        
        return this.candidaturaRepository.save(newCandidatura);
    }

    async update(id: number, updateCandidaturaDto: UpdateCandidaturaDto): Promise<Candidatura> {
        const candidatura = await this.candidaturaRepository.findOneBy({id});
        if (!candidatura) {
            throw new NotFoundException('Candidatura não encontrada');
        }

        if (updateCandidaturaDto.statusId){
            const status = await this.candidaturaTagService.findOne(updateCandidaturaDto.statusId);

            if (!status){
                throw new Error(`Status com id ${updateCandidaturaDto.statusId} não encontrado!`)
            }else{
                candidatura.status= status
            }
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