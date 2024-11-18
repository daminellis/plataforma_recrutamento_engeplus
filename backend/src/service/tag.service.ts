import { forwardRef, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../model/tag.entity";
import { CreateTagDto } from "src/dto/tags/CreateTag.dto";
import { UpdateTagDto } from "src/dto/tags/UpdateTag.dto";
import { SuccessResponseDto } from "src/dto/responses/SuccessResponse.dto";
import { CustomHttpException } from "src/errors/exceptions/custom-exceptions";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
    ) { }

    async findAllTags(): Promise<Tag[]> {
        return this.tagRepository.find();
    }

    async findOneTag(id: number): Promise<Tag | null> {
        return this.tagRepository.findOne({
            where: { id },
            relations: ['vagas']
        });
    }

    async create(createTagDto: CreateTagDto): Promise<SuccessResponseDto> {
        try{
            const newTag = this.tagRepository.create(createTagDto);
            await this.tagRepository.save(newTag);
    
            return {success: true, code: HttpStatus.CREATED, message: 'Tag para vaga criada com sucesso'} as SuccessResponseDto;
        } catch (err) {
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: number, updateTagDto: UpdateTagDto): Promise<SuccessResponseDto> {
        try{
            const tag = await this.tagRepository.findOneBy({ id });
            if (!tag) {
                throw new NotFoundException('Tag não encontrada');
            }
            Object.assign(tag, updateTagDto);
            await this.tagRepository.save(tag);

            return {success: true, code: HttpStatus.OK, message: 'Tag atualizada com sucesso'} as SuccessResponseDto;
        }catch(err){
            throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number): Promise<void> {
        const tag = await this.tagRepository.findOneBy({ id });
        if (!tag) {
            throw new NotFoundException('Tag não encontrada');
        }
        await this.tagRepository.delete(id);
    }
}