import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CandidaturaTag } from "../model/candidaturatag.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCandidaturaTagDto } from "src/dto/candidaturas/candidatura-tag/CreateCandidaturaTag.dto";
import { UpdateCandidaturaTagDto } from "src/dto/candidaturas/candidatura-tag/UpdateCandidaturatag.dto";
import { CustomHttpException } from "src/errors/exceptions/custom-exceptions";

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
    return this.candidaturaTagRepository.findOneBy({id});
  }

  async create(CreateCandidaturaTagDto: CreateCandidaturaTagDto): Promise<CandidaturaTag> {
    const newCandidaturaTag = this.candidaturaTagRepository.create(CreateCandidaturaTagDto);
    return this.candidaturaTagRepository.save(newCandidaturaTag);
  }

  async update(id: number, updateCandidaturaTagDto: UpdateCandidaturaTagDto): Promise<CandidaturaTag> {
    const candidaturaTagToUpdate = await this.candidaturaTagRepository.findOneBy({id});
    if (!candidaturaTagToUpdate) {
      throw new CustomHttpException('CandidaturaTag não encontrada', HttpStatus.NOT_FOUND);
    }
    Object.assign(candidaturaTagToUpdate, updateCandidaturaTagDto);
    return this.candidaturaTagRepository.save(candidaturaTagToUpdate);
  }

  async delete(id: number): Promise<void> {
    const candidaturaTag = await this.candidaturaTagRepository.findOneBy({id});
    if (!candidaturaTag) {
      throw new CustomHttpException('CandidaturaTag não encontrada', HttpStatus.NOT_FOUND);
    }
    this.candidaturaTagRepository.remove(candidaturaTag);
  }
}