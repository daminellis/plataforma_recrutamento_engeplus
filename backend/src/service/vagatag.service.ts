import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VagaTag } from "../model/vagatag.entity";
import { CreateVagaTagDto } from "../dto/vagatags/CreateVagaTag.dto";
import { UpdateVagaTagDto } from "../dto/vagatags/UpdateVagaTag.dto";

@Injectable()
export class VagaTagService {
    constructor(@InjectRepository(VagaTag)
    private vagatagsRepository: Repository<VagaTag>) { }

    async findAllVagaTags(): Promise<VagaTag[]> {
        return this.vagatagsRepository.find();
    }

    async findOneVagaTag(id: number): Promise<VagaTag | null> {
        return this.vagatagsRepository.findOneBy({ id });
    }

    // async create(createVagaTagDto: CreateVagaTagDto): Promise<VagaTag> {
    //     const newVagaTag = this.vagatagsRepository.create(createVagaTagDto);
    //     return this.vagatagsRepository.save(newVagaTag);
    // }
}