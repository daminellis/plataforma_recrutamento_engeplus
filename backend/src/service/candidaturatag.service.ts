import { Injectable } from "@nestjs/common";
import { CandidaturaTag } from "../model/candidaturatag.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CandidaturaTagService {
  constructor(
    @InjectRepository(CandidaturaTag)
    private CandidaturaTagRepository: Repository<CandidaturaTag>
  ) {  
  }

  async findAll(): Promise<any> {
    return [];
  }
}