import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../model/tag.entity";

@Injectable()
export class TagService {
    // constructor(
    //     @InjectRepository(Candidatura)
    //     private candidaturaRepository: Repository<Candidatura>
    // ) {}

    // async create(candidatura: Candidatura): Promise<Candidatura> {
    //     return this.candidaturaRepository.save(candidatura);
    // }

    // async readAll(): Promise<Candidatura[]> {
    //     return this.candidaturaRepository.find();
    // }

    // async readOne(id: number): Promise<Candidatura> {
    //     return this.candidaturaRepository.findOneBy({id});
    // }

    // async update(candidatura: Candidatura): Promise<Candidatura> {
    //     return this.candidaturaRepository.save(candidatura);
    // }

    // async delete(id: number): Promise<void> {
    //     await this.candidaturaRepository.delete(id);
    // }
}