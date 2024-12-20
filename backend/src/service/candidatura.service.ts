import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
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
        // private bancoTalentosService: BancoTalentosService,
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
                if (updateCandidaturaDto.status === StatusCandidatura.APROVADO) {
                    this.sendEmailDto = {
                        email: candidatura.email,
                        nomeCompleto: candidatura.nomeCompleto
                    }
                    this.emailService.sendApprovedEmail(this.sendEmailDto);
                } else if (updateCandidaturaDto.status === StatusCandidatura.REPROVADO) {
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


    //Aprovação e reprovação de candidaturas

    async approveCandidatura(id: number[]): Promise<SuccessResponseDto> {
        try {
            // Vereificar se a candidatura existe
            const candidaturas = await Promise.all(id.map(async (candidaturaId) => await this.findOneCandidatura(candidaturaId)));
            const candidatura = candidaturas.find(c => c !== null);

            if (!candidatura) {
                throw new CustomHttpException(`Candidatura(s) com id ${id} não encontrada!`, HttpStatus.NOT_FOUND);
            }

            // Atualizar o status da candidatura e envia o email de aprovação
            for (const candidaturaId of id) {
                await this.update(candidaturaId, { status: StatusCandidatura.APROVADO });
            }

            //Seleciona a vaga da candidatura
            const vaga = candidatura.vaga;

            if (!vaga) {
                throw new CustomHttpException('Vaga não encontrada', HttpStatus.NOT_FOUND);
            }
            //Atualiza a vaga para indisponível
            // await this.vagaService.updateVaga(vaga.id, { disponivel: false });

            await this.vagaService.markAsExpired(vaga.id);

            //Remove o candidato aprovado da lista da vaga e automaticamente os reprovados recebem o email de reprovação
            // e são mapeados para o banco de talentos
            await this.vagaService.removeCandidatura(vaga.id, [candidatura.id]);

            //Remover a candidatura da lista de candidaturas 
            for (const candidaturaId of id) {
                await this.delete(candidaturaId);
            }

            return { success: true, code: HttpStatus.OK, message: "Candidato aprovado!" } as SuccessResponseDto;
        } catch (err) {
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async disapproveCandidatura(id: number): Promise<SuccessResponseDto> {
        try {
            // Verificar se a candidatura existe
            const candidatura = await this.findOneCandidatura(id);

            if (!candidatura) {
                throw new CustomHttpException(`Candidatura com id ${id} não encontrada!`, HttpStatus.NOT_FOUND);
            }

            // Atualizar o status da candidatura e envia o email de aprovação
            await this.update(id, { status: StatusCandidatura.REPROVADO });

            // Seleciona a vaga associada à candidatura
            const vaga = candidatura.vaga;

            if (!vaga) {
                throw new CustomHttpException('Vaga não encontrada', HttpStatus.NOT_FOUND);
            }

            // Remover a candidatura do sistema
            await this.delete(id);
            
            return { success: true, code: HttpStatus.OK, message: "Candidato reprovado!" } as SuccessResponseDto;
        } catch (err) {
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}