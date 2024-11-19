import {
  Injectable,
  NotFoundException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { isValid } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateVagaDto } from '../dto/vagas/CreateVaga.dto';
import { UpdateVagaDto } from '../dto/vagas/UpdateVaga.dto';
import Vaga from '../model/vaga.entity';
import { dateFormater } from '../utils/functions/dateFormater';
import { CandidaturaService } from './candidatura.service';
import { SetorService } from './setor.service';
import { UsuarioService } from './usuario.service';
import { TagService } from './tag.service';
import { CustomHttpException } from 'src/errors/exceptions/custom-exceptions';
import { ResponseCountCandidatureDto } from 'src/dto/vagas/ResponseCountCandidature.dto';
import { Cron } from '@nestjs/schedule';

import { TempoDeExperiencia, NivelDeEducacao, NivelDeExperiencia, Modalidade } from '../model/vaga.entity';
import { SuccessResponseDto } from 'src/dto/responses/SuccessResponse.dto';
@Injectable()
export class VagaService {
  constructor(
    @InjectRepository(Vaga)
    private vagasRepository: Repository<Vaga>, // Permite acessar os métodos do Repository
    private usuarioService: UsuarioService,
    private setorService: SetorService,
    private tagService: TagService,
    @Inject(forwardRef(() => CandidaturaService)) private candidaturaService: CandidaturaService,
  ) {
  }

  async getEnums(): Promise<{ tempoDeExperiencia: typeof TempoDeExperiencia, nivelDeEducacao: typeof NivelDeEducacao, nivelDeExperiencia: typeof NivelDeExperiencia, modalidade: typeof Modalidade }> {
    const enums = {
      tempoDeExperiencia: TempoDeExperiencia,
      nivelDeEducacao: NivelDeEducacao,
      nivelDeExperiencia: NivelDeExperiencia,
      modalidade: Modalidade
    }

    return enums;
  }

  // FUNÇÕES PARA O CRUD DE VAGAS

  //Get all vagas
  async findAllVagas(): Promise<Vaga[]> {
    const vagas = await this.vagasRepository.find({
      select: ['id', 'titulo', 'salarioMinimo', 'salarioMaximo', 'regiao', 'dataPostagem'],
      relations: ['setor', 'tags'],
      where: { disponivel: true }
    }); // SELECT * FROM vagas

    return vagas;
  }

  async findAllVagasByLiderCargo(): Promise<Vaga[]> {
    const vagas = await this.vagasRepository.createQueryBuilder('vaga')
      .leftJoinAndSelect('vaga.setor', 'setor')
      .leftJoinAndSelect('vaga.tags', 'tags')
      .leftJoinAndSelect('vaga.recrutador', 'recrutador')
      .leftJoinAndSelect('recrutador.cargo', 'cargo')
      .where('cargo.nome = :cargoNome', { cargoNome: 'Líder' })
      .getMany();

    return vagas;
  }


  //Get one vaga
  async findOneVaga(id: number): Promise<Vaga | null> {
    const vaga = await this.vagasRepository.findOne({
      where: { id },
      select: ['id', 'titulo', 'salarioMinimo', 'salarioMaximo', 'educacao', 'tempoExperiencia', 'nivelExperiencia', 'modalidade', 'quantidadeVagas', 'dataExpiracao', 'descricao', 'responsabilidades', 'regiao', 'dataPostagem'],
      relations: ['recrutador', 'setor', 'tags', 'candidatura'],
    }); // SELECT * FROM vagas WHERE id = ...

    return vaga;
  }

  async findAllPrivateVagas(): Promise<ResponseCountCandidatureDto[]> {

    type VagaWithCount = Vaga & { candidaturaCount: number };

    const candidatosPorAllVagas = await this.vagasRepository
      .createQueryBuilder('vaga')
      .leftJoinAndSelect('vaga.setor', 'setor')
      .leftJoinAndSelect('vaga.tags', 'tags')
      .leftJoinAndSelect('vaga.recrutador', 'recrutador')
      .loadRelationCountAndMap('vaga.candidaturaCount', 'vaga.candidatura')
      .orderBy('vaga.dataPostagem', 'DESC')
      .getMany() as VagaWithCount[];

    const candidateCounter: ResponseCountCandidatureDto[] = [];

    candidatosPorAllVagas.forEach(vaga => {
      if (vaga && vaga.setor && vaga.recrutador) {
        candidateCounter.push({
          id: vaga.id,
          titulo: vaga.titulo,
          salarioMinimo: vaga.salarioMinimo,
          salarioMaximo: vaga.salarioMaximo,
          regiao: vaga.regiao,
          dataPostagem: vaga.dataPostagem,
          dataExpiracao: vaga.dataExpiracao,
          disponivel: vaga.disponivel,
          setor: vaga.setor,
          tags: vaga.tags,
          candidaturaCount: vaga.candidaturaCount,
        });
      } else {
        console.error('Propriedades indefinidas em vaga:', vaga);
      }
    });

    return candidateCounter;
  }

  async findAllPrivateVagasByLider(): Promise<ResponseCountCandidatureDto[]> {
    type VagaWithCount = Vaga & { candidaturaCount: number };

    const candidatosPorLiderVagas = await this.vagasRepository
      .createQueryBuilder('vaga')
      .loadRelationCountAndMap('vaga.candidaturaCount', 'vaga.candidatura')
      .leftJoinAndSelect('vaga.setor', 'setor')
      .leftJoinAndSelect('vaga.tags', 'tags')
      .leftJoinAndSelect('vaga.recrutador', 'recrutador')
      .leftJoinAndSelect('recrutador.cargo', 'cargo')
      .where('cargo.nome = :cargoNome', { cargoNome: 'Líder' })
      .orderBy('vaga.dataPostagem', 'DESC')
      .getMany() as VagaWithCount[];

    const candidateCounter: ResponseCountCandidatureDto[] = [];
    candidatosPorLiderVagas.forEach(vaga => {
      if (vaga && vaga.setor && vaga.recrutador) {
        candidateCounter.push({
          id: vaga.id,
          titulo: vaga.titulo,
          salarioMinimo: vaga.salarioMinimo,
          salarioMaximo: vaga.salarioMaximo,
          regiao: vaga.regiao,
          dataPostagem: vaga.dataPostagem,
          dataExpiracao: vaga.dataExpiracao,
          disponivel: vaga.disponivel,
          setor: vaga.setor,
          tags: vaga.tags,
          candidaturaCount: vaga.candidaturaCount,
        });
      } else {
        console.error('Propriedades indefinidas em vaga:', vaga);
      }
    });

    return candidateCounter;
  }

  async markAsExpired(id: number): Promise<SuccessResponseDto> {
    try {
      const vaga = await this.vagasRepository.findOneBy({ id });
      if (!vaga) {
        throw new NotFoundException('Vaga não encontrada');
      }

      vaga.disponivel = false;
      await this.vagasRepository.save(vaga);

      return {
        success: true,
        code: HttpStatus.OK,
        message: 'Marcada como expirada com sucesso',
      } as SuccessResponseDto;

    } catch (err) {
      throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Cron('0 0 3 * * *', {
    name: 'Verificador de expiração das vagas',
    timeZone: 'Greenwich',
  })
  async verifyExpirationDate(): Promise<void> {
    const currentDate= new Date()
    const vagasExpiradas= await this.vagasRepository.find({
      where: {
        dataExpiracao: LessThanOrEqual(currentDate),
        disponivel: true,
      },
    })

    if ( vagasExpiradas.length > 0) {
      for (const vaga of vagasExpiradas) {
        vaga.disponivel = false;
        await this.vagasRepository.save(vaga);
      }
    }
  }

  //Cria uma vaga
  async createVaga(createVagaDto: CreateVagaDto): Promise<SuccessResponseDto> {

    try {
      const newVaga = this.vagasRepository.create(createVagaDto);
      if (createVagaDto.dataExpiracao) {
        const formattedDate = new Date(dateFormater(createVagaDto.dataExpiracao));
        if (!isValid(formattedDate)) {
          throw new CustomHttpException('Data de expiração inválida', HttpStatus.BAD_REQUEST);
        }
        newVaga.dataExpiracao = formattedDate;
        if (newVaga.dataExpiracao < new Date()) {
          throw new CustomHttpException('Data de expiração inválida', HttpStatus.BAD_REQUEST);
        }
      }

      if (createVagaDto.recruiterId) {
        const recruiter = await this.usuarioService.findOne(
          createVagaDto.recruiterId,
        );
        if (recruiter) {
          newVaga.recrutador = { id: recruiter.id, nomeCompleto: recruiter.nomeCompleto } as any;
        } else {
          throw new NotFoundException('Recrutador não encontrado');
        }
      }
      if (createVagaDto.setorId) {
        const sector = await this.setorService.findOneSetor(createVagaDto.setorId);
        if (sector) {
          newVaga.setor = sector;
        } else {
          throw new CustomHttpException(`Setor ${createVagaDto.setorId} não encontrado`, HttpStatus.NOT_FOUND);
        }
      }

      if (createVagaDto.tagIds) {
        newVaga.tags = [];
        for (let i = 0; i < createVagaDto.tagIds.length; i++) {
          const tags = await this.tagService.findOneTag(createVagaDto.tagIds[i]);
          if (tags) {
            newVaga.tags.push({ id: tags.id, nome: tags.nome, cor: tags.corTag } as any);
          } else {
            throw new CustomHttpException(`Tag(s) ${createVagaDto.tagIds[i]} não encontrada(s). Favor atribuir uma tag válida.`, HttpStatus.NOT_FOUND);
          }
        }
      }
      await this.vagasRepository.save(newVaga); // INSERT INTO vagas

      return {
        success: true,
        code: HttpStatus.CREATED,
        message: 'Vaga criada com sucesso',
      } as SuccessResponseDto;

    } catch (err) {
      throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
    }

  }


  // Atualiza uma vaga
  async updateVaga(id: number, updateVagaDto: UpdateVagaDto): Promise<SuccessResponseDto> {
    try {
      const vaga = await this.vagasRepository.findOneBy({ id });
      if (!vaga) {
        throw new NotFoundException('Vaga não encontrada');
      }

      if (updateVagaDto.dataExpiracao) {
        const formattedDate = dateFormater(updateVagaDto.dataExpiracao);
        if (!isValid(formattedDate)) {
          throw new CustomHttpException('Data de expiração inválida', HttpStatus.BAD_REQUEST);
        }
        vaga.dataExpiracao = new Date(formattedDate);
        if (vaga.dataExpiracao < new Date()) {
          throw new CustomHttpException('Data de expiração inválida', HttpStatus.BAD_REQUEST);
        }
      }

      if (updateVagaDto.candidaturaIds) {
        vaga.candidatura = [];
        for (let i = 0; i < updateVagaDto.candidaturaIds.length; i++) {
          const candidaturas = await this.candidaturaService.findOneCandidatura(updateVagaDto.candidaturaIds[i]);
          if (candidaturas) {
            vaga.candidatura.push({ id: candidaturas.id, nomeCompleto: candidaturas.nomeCompleto, email: candidaturas.email, telefone: candidaturas.telefone } as any);
          } else {
            throw new CustomHttpException(`Candidato ${updateVagaDto.candidaturaIds[i]} não encontrado. Favor atribuir um candidato válido.`, HttpStatus.NOT_FOUND);
          }
        }
      }

      if (updateVagaDto.recruiterId) {
        const recruiter = await this.usuarioService.findOne(
          updateVagaDto.recruiterId,
        );

        if (recruiter) {
          vaga.recrutador = recruiter;
        } else {
          throw new NotFoundException('Recrutador não encontrado');
        }
      }
      if (updateVagaDto.setorId) {
        const sector = await this.setorService.findOneSetor(updateVagaDto.setorId);
        if (sector) {
          vaga.setor = sector;
        } else {
          throw new NotFoundException('Setor não encontrado');
        }
      }

      if (updateVagaDto.tagIds) {
        vaga.tags = [];
        for (let i = 0; i < updateVagaDto.tagIds.length; i++) {
          const tags = await this.tagService.findOneTag(updateVagaDto.tagIds[i]);
          if (tags) {
            vaga.tags.push(tags);
          } else {
            throw new CustomHttpException(`Tag(s) ${updateVagaDto.tagIds[i]} não encontrada(s). Favor atribuir uma tag válida.`, HttpStatus.NOT_FOUND);
          }
        }
      }

      Object.assign(vaga, updateVagaDto);
      await this.vagasRepository.save(vaga); // UPDATE vagas SET ...

      return { success: true, code: HttpStatus.OK, message: 'Vaga atualizada com sucesso!' } as SuccessResponseDto;
    } catch (err) {
      throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteVaga(id: number): Promise<void> {
    const vaga = await this.vagasRepository.findOneBy({ id });
    if (!vaga) {
      throw new NotFoundException('Vaga não encontrada');
    }
    await this.vagasRepository.delete(id);
  }

  async deleteAllNullVagas(): Promise<void> {

    const vagas = await this.vagasRepository.find({ relations: ["setor"] });

    const vagasNull = vagas.filter(vaga => vaga.setor === null);

    for (let i = 0; i < vagasNull.length; i++) {
      await this.vagasRepository.delete(vagasNull[i].id);
    }
  }
}
