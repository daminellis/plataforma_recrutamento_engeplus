import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { VagaTagService } from "../service/vagatag.service";
import { VagaTag } from "../model/vagatag.entity";
import { CreateVagaTagDto } from "../dto/vagatags/CreateVagaTag.dto";
import { UpdateVagaTagDto } from "../dto/vagatags/UpdateVagaTag.dto";

@Controller('vagatags')
export class VagaTagController {
    
    constructor(private vagaTagService: VagaTagService) {}

    @Get('/all')
    async findAll(): Promise<VagaTag[]> {
        return this.vagaTagService.findAllVagaTags();
    }

    @Get('/find/:id')
    async findOne(@Param('id') id: number): Promise<VagaTag | null> {
        return this.vagaTagService.findOneVagaTag(id);
    }

    @Post('/create')
    async createVagaTag(@Body() createVagaTagDto: CreateVagaTagDto): Promise<VagaTag> {
        return this.vagaTagService.create(createVagaTagDto);
    }

    @Put('/update/:id')
    async updateVagaTag(@Param('id') id: number, @Body() updateVagaTagDto: UpdateVagaTagDto): Promise<VagaTag> {
        return this.vagaTagService.update(id, updateVagaTagDto);
    }

    @Delete('/delete/:id')
    async deleteVagaTag(@Param('id') id: number): Promise<void> {
        return this.vagaTagService.delete(id);
    }
}