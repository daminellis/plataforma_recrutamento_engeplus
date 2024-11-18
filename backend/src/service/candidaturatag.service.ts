import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CandidaturaTag } from "../model/candidaturatag.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCandidaturaTagDto } from "src/dto/candidaturas/candidatura-tag/CreateCandidaturaTag.dto";
import { UpdateCandidaturaTagDto } from "src/dto/candidaturas/candidatura-tag/UpdateCandidaturatag.dto";
import { CustomHttpException } from "src/errors/exceptions/custom-exceptions";
import { SuccessResponseDto } from "src/dto/responses/SuccessResponse.dto";

@Injectable()
export class CandidaturaTagService {
  constructor(
    @InjectRepository(CandidaturaTag)
    private candidaturaTagRepository: Repository<CandidaturaTag>
  ) {
  }
  async findAll(): Promise<CandidaturaTag[]> {
    return this.candidaturaTagRepository.find();
  }

  async findOne(id: number): Promise<CandidaturaTag | null> {
    return this.candidaturaTagRepository.findOneBy({ id });
  }

  async create(CreateCandidaturaTagDto: CreateCandidaturaTagDto): Promise<SuccessResponseDto> {
    try {
      const newCandidaturaTag = this.candidaturaTagRepository.create(CreateCandidaturaTagDto);
      await this.candidaturaTagRepository.save(newCandidaturaTag);

      return { success: true, code: HttpStatus.CREATED, message: 'Tag para candidatura criada com sucesso' } as SuccessResponseDto;

    } catch (err) {
      throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateCandidaturaTagDto: UpdateCandidaturaTagDto): Promise<SuccessResponseDto> {
    try {
      const candidaturaTagToUpdate = await this.candidaturaTagRepository.findOneBy({ id });
      if (!candidaturaTagToUpdate) {
        throw new CustomHttpException('CandidaturaTag não encontrada', HttpStatus.NOT_FOUND);
      }
      Object.assign(candidaturaTagToUpdate, updateCandidaturaTagDto);
      await this.candidaturaTagRepository.save(candidaturaTagToUpdate);

      return { success: true, code: HttpStatus.OK, message: 'Tag para candidatura atualizada com sucesso' } as SuccessResponseDto;
    } catch (err) {
      throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<void> {
    const candidaturaTag = await this.candidaturaTagRepository.findOneBy({ id });
    if (!candidaturaTag) {
      throw new CustomHttpException('CandidaturaTag não encontrada', HttpStatus.NOT_FOUND);
    }
    this.candidaturaTagRepository.remove(candidaturaTag);
  }
}