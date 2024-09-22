import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../model/tag.entity";
import { CreateTagDto } from "src/dto/tags/CreateTag.dto";
import { UpdateTagDto } from "src/dto/tags/UpdateTag.dto";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private candidaturaRepository: Repository<Tag>
    ) {}

    async findAllTags(): Promise<Tag[]> {
        return this.candidaturaRepository.find();
    }

    async findOneTag(id: number): Promise<Tag | null> {
        return this.candidaturaRepository.findOneBy({id});
    }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const newTag = this.candidaturaRepository.create(createTagDto);
        return this.candidaturaRepository.save(newTag);
    }

    async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
        const tag = await this.candidaturaRepository.findOneBy({id});
        if (!tag) {
            throw new NotFoundException('Tag não encontrada');
        }
        Object.assign(tag, updateTagDto);
        return this.candidaturaRepository.save(tag);
    }

    async delete(id: number): Promise<void> {
        const tag = await this.candidaturaRepository.findOneBy({id});
        if (!tag) {
            throw new NotFoundException('Tag não encontrada');
        }
        await this.candidaturaRepository.delete(id);
    }
}