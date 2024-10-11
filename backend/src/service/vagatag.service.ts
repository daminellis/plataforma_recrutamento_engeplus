import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
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

    async create(createVagaTagDto: CreateVagaTagDto): Promise<VagaTag> {
        const newVagaTag = this.vagatagsRepository.create(createVagaTagDto as DeepPartial<VagaTag>);
        return this.vagatagsRepository.save(newVagaTag);
    }

    async update(id: number, updateVagaTagDto: UpdateVagaTagDto): Promise<VagaTag> {
        const vagaTag = await this.vagatagsRepository.findOneBy({ id });
        if (!vagaTag) {
            throw new NotFoundException('VagaTag não encontrada');
        }
        Object.assign(vagaTag, updateVagaTagDto);
        return this.vagatagsRepository.save(vagaTag);
    }

    async delete(id: number): Promise<void> {
        const vagaTag = await this.vagatagsRepository.findOneBy({ id });
        if (!vagaTag) {
            throw new NotFoundException('VagaTag não encontrada');
        }
        await this.vagatagsRepository.delete(id);
    }
}