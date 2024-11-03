import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../model/tag.entity";
import { CreateTagDto } from "src/dto/tags/CreateTag.dto";
import { UpdateTagDto } from "src/dto/tags/UpdateTag.dto";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
    ) { }

    async findAllTags(): Promise<Tag[]> {
        return this.tagRepository.find({
            relations: ['vagas']
        });
    }

    async findOneTag(id: number): Promise<Tag | null> {
        return this.tagRepository.findOne({
            where: { id },
            relations: ['vagas']
        });
    }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const newTag = this.tagRepository.create(createTagDto);
        return this.tagRepository.save(newTag);
    }

    async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
        const tag = await this.tagRepository.findOneBy({ id });
        if (!tag) {
            throw new NotFoundException('Tag não encontrada');
        }
        Object.assign(tag, updateTagDto);
        return this.tagRepository.save(tag);
    }

    async delete(id: number): Promise<void> {
        const tag = await this.tagRepository.findOneBy({ id });
        if (!tag) {
            throw new NotFoundException('Tag não encontrada');
        }
        await this.tagRepository.delete(id);
    }
}