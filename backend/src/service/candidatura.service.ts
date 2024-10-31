import { forwardRef, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Candidatura } from "../model/candidatura.entity";
import {CreateCandidaturaDto} from "../dto/candidaturas/CreateCandidatura.dto";
import {UpdateCandidaturaDto} from "../dto/candidaturas/UpdateCandidatura.dto";
import { VagaService } from "./vaga.service";
import { CandidaturaTagService } from "./candidaturatag.service";
import { CustomHttpException } from "src/errors/exceptions/custom-exceptions";

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
            relations: ['vaga', 'candidaturaTagId']
        });
    }

    async findAllLiderCandidaturas (): Promise<Candidatura[]> {
        const vagasLider= await this.vagaService.findAllVagasByLiderSetor();
        const candidaturasLider: Candidatura[] = [];

        for (const vaga of vagasLider){
            const candidaturas = await this.vagaService.findAllCandidaturasByVaga(vaga.id);
            candidaturasLider.push(...candidaturas);
        }

        return candidaturasLider;
    }

    async findOneCandidatura(id: number): Promise<Candidatura | null> {
        return this.candidaturaRepository.findOne({
            where: { id },
            relations: ['vaga', 'candidaturaTagId']
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
                throw new CustomHttpException('Vaga não encontrada', HttpStatus.BAD_REQUEST);
            }
            newCandidatura.vaga = {id: vaga.id, titulo: vaga.titulo} as any;
        }
        
        return this.candidaturaRepository.save(newCandidatura);
    }

    async update(id: number, updateCandidaturaDto: UpdateCandidaturaDto): Promise<Candidatura> {
        const candidatura = await this.candidaturaRepository.findOneBy({id});
        if (!candidatura) {
            throw new CustomHttpException(`Candidatura com id ${id} não encontrada!`, HttpStatus.BAD_REQUEST);
        }

        if (updateCandidaturaDto.candidaturaTagId){
            const candidaturaTag = await this.candidaturaTagService.findOne(updateCandidaturaDto.candidaturaTagId);

            if (!candidaturaTag){
                throw new CustomHttpException(`Status com id ${updateCandidaturaDto.candidaturaTagId} não encontrado!`, HttpStatus.BAD_REQUEST);
            }else{
                candidatura.candidaturaTagId= candidaturaTag
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