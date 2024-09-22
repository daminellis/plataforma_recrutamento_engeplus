import { Controller, Get, Param, Body, Post, Delete, Put } from "@nestjs/common";
import { TagService } from "../service/tag.service";
import { CreateTagDto } from "src/dto/tags/CreateTag.dto";
import { UpdateTagDto } from "src/dto/tags/UpdateTag.dto";

@Controller('tags')
export class TagController {
    constructor(private tagService: TagService) {}

    @Get('all')
    async findAllTags() {
        return this.tagService.findAllTags();
    }

    @Get('find/:id')
    async findOneTag(@Param('id') id: number) {
        return this.tagService.findOneTag(id);
    }

    @Post('create')
    async create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
        return this.tagService.update(id, updateTagDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return this.tagService.delete(id);
    }
}