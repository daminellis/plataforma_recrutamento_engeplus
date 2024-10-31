import { Controller, Get, Param, Body, Post, Delete, Put } from "@nestjs/common";
import { TagService } from "../service/tag.service";
import { CreateTagDto } from "src/dto/tags/CreateTag.dto";
import { UpdateTagDto } from "src/dto/tags/UpdateTag.dto";
import Tag from "src/model/tag.entity";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";

@Controller('tags')
@AllowUserTypes('Admininstrador', 'Recursos Humanos')
export class TagController {
    constructor(private tagService: TagService) {}

    @Get('/all')
    async findAllTags(): Promise<Tag[]> {
        return this.tagService.findAllTags();
    }

    @Get('/find/:id')
    async findOneTag(@Param('id') id: number): Promise<Tag | null> {
        return this.tagService.findOneTag(id);
    }

    @Post('/create')
    async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
        return this.tagService.create(createTagDto);
    }

    @Put('/update/:id')
    async update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto): Promise<Tag> {
        return this.tagService.update(id, updateTagDto);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.tagService.delete(id);
    }
}