import {HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Candidatura } from "../model/candidatura.entity";
import { CreateCandidaturaDto } from "../dto/candidaturas/CreateCandidatura.dto";
import { UpdateCandidaturaDto } from "../dto/candidaturas/UpdateCandidatura.dto";
import { VagaService } from "./vaga.service";
import { CandidaturaTagService } from "./candidaturatag.service";
import { CustomHttpException } from "src/errors/exceptions/custom-exceptions";
import { EmailService } from "src/email/email.service";
import { SendEmailDto } from "src/dto/emails/SendEmail.dto";
import { StatusCandidatura } from "../model/candidatura.entity";
import { SuccessResponseDto } from "src/dto/responses/SuccessResponse.dto";

@Injectable()
export class CandidaturaService {
    private sendEmailDto: SendEmailDto;
    constructor(
        @InjectRepository(Candidatura)
        private candidaturaRepository: Repository<Candidatura>,
        private candidaturaTagService: CandidaturaTagService,
        private emailService: EmailService,
        private vagaService: VagaService
    ) { }

    async getEnum(): Promise<{ statusCandidatura: typeof StatusCandidatura }> {
        return { statusCandidatura: StatusCandidatura };
    }

    async findAllCandidaturas(): Promise<Candidatura[]> {
        return this.candidaturaRepository.find({
            select: ['id', 'nomeCompleto', 'email', 'telefone', 'descricao', 'favorito', 'dataCandidatura'],
            relations: ['vaga', 'candidaturaTagId']
        });
    }

    async findAllLiderCandidaturas(): Promise<Candidatura[]> {
        const vagasLider = await this.vagaService.findAllVagasByLiderCargo();
        const candidaturasLider: Candidatura[] = [];

        for (const vaga of vagasLider) {
            const candidaturas = await this.findAllByVaga(vaga.id);
            if (candidaturas) {
                candidaturasLider.push(...candidaturas);
            }
        }

        return candidaturasLider;
    }

    async findOneCandidatura(id: number): Promise<Candidatura | null> {
        return this.candidaturaRepository.findOne({
            where: { id },
            relations: ['vaga', 'candidaturaTagId']
        });
    }

    async findAllByVaga(vagaId: number): Promise<Candidatura[] | null> {

        const candidatosPorVaga: Candidatura[] = await this.candidaturaRepository.find({ where: { vaga: { id: vagaId } } });

        return candidatosPorVaga;

    }

    async create(createCandidaturaDto: CreateCandidaturaDto): Promise<SuccessResponseDto> {
        try {
            const newCandidatura = this.candidaturaRepository.create(createCandidaturaDto);

            if (createCandidaturaDto.vagaId) {
                const vaga = await this.vagaService.findOneVaga(parseInt(createCandidaturaDto.vagaId));
                if (!vaga) {
                    throw new CustomHttpException('Vaga não encontrada', HttpStatus.NOT_FOUND);
                }
                newCandidatura.vaga = { id: vaga.id, titulo: vaga.titulo } as any;
            }

            await this.candidaturaRepository.save(newCandidatura);

            return { success: true, code: HttpStatus.CREATED, message: "Candidatura criada com sucesso!" } as SuccessResponseDto;
        } catch (err) {
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: number, updateCandidaturaDto: UpdateCandidaturaDto): Promise<SuccessResponseDto> {
        try {
            const candidatura = await this.candidaturaRepository.findOneBy({ id });
            if (!candidatura) {
                throw new CustomHttpException(`Candidatura com id ${id} não encontrada!`, HttpStatus.NOT_FOUND);
            }

            if (updateCandidaturaDto.candidaturaTagId) {
                const candidaturaTag = await this.candidaturaTagService.findOne(updateCandidaturaDto.candidaturaTagId);

                if (!candidaturaTag) {
                    throw new CustomHttpException(`Status com id ${updateCandidaturaDto.candidaturaTagId} não encontrado!`, HttpStatus.NOT_FOUND);
                } else {
                    candidatura.candidaturaTagId = candidaturaTag
                }
            }

            if (updateCandidaturaDto.status) {
                if (updateCandidaturaDto.status === 'Aprovado') {
                    this.sendEmailDto = {
                        email: candidatura.email,
                        nomeCompleto: candidatura.nomeCompleto
                    }
                    this.emailService.sendApprovedEmail(this.sendEmailDto);
                } else if (updateCandidaturaDto.status === 'Reprovado') {
                    this.sendEmailDto = {
                        email: candidatura.email,
                        nomeCompleto: candidatura.nomeCompleto
                    }
                    this.emailService.sendDisapprovedEmail(this.sendEmailDto);
                }
            }

            Object.assign(candidatura, updateCandidaturaDto);
            await this.candidaturaRepository.save(candidatura);

            return { success: true, code: HttpStatus.OK, message: "Candidatura atualizada com sucesso!" } as SuccessResponseDto;
            
        } catch (err) {
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number): Promise<void> {
        const candidatura = await this.candidaturaRepository.findOneBy({ id });
        if (!candidatura) {
            throw new NotFoundException('Candidatura não encontrada');
        }
        await this.candidaturaRepository.delete(id);
    }
}