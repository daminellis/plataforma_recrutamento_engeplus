import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../model/tag.entity";
import { CreateTagDto } from "src/dto/tags/CreateTag.dto";
import { UpdateTagDto } from "src/dto/tags/UpdateTag.dto";
import { VagaTagService } from "./vagatag.service";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
        private vagaTagService: VagaTagService
    ) { }

    async findAllTags(): Promise<Tag[]> {
        return this.tagRepository.find({
            relations: ['vagatag']
        });
    }

    async findOneTag(id: number): Promise<Tag | null> {
        return this.tagRepository.findOneBy({ id });
    }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const newTag = this.tagRepository.create(createTagDto);

        if (createTagDto.vagatagIds) {
            newTag.vagatag = [];
            for (let i = 0; i < createTagDto.vagatagIds.length; i++) {
                const vagatagIds = await this.vagaTagService.findOneVagaTag(createTagDto.vagatagIds[i]);
                if (vagatagIds) {
                    newTag.vagatag.push(vagatagIds);
                } else {
                    throw new Error(`Vagas com id tag(s) ${createTagDto.vagatagIds[i]} não encontrada(s). Favor atribuir uma vaga válida.`);
                }
            }
        }
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