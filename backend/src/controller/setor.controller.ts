import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SetorService } from "../service/setor.service";
import { CreateSetorDto } from "../dto/setores/CreateSetor.dto";
import { UpdateSetorDto } from "src/dto/setores/UpdateSetor.dto";

@Controller('setores')
export class SetorController{
    constructor(private setorService: SetorService){};

    @Get('all')
    async findAllSetores(){
        return await this.setorService.findAllSetores();
    }

    @Get('find/:id')
    async findOneSetor(@Param('id') id: number){
        return await this.setorService.findOneSetor(id);
    }

    @Post('create')
    async createSetor(@Body() createSetorDto: CreateSetorDto){
        return await this.setorService.createSetor(createSetorDto);
    }

    @Put('update/:id')
    async updateSetor(@Param('id') id: number, @Body() updateSetorDto: UpdateSetorDto){
        return await this.setorService.updateSetor(id, updateSetorDto);
    }

    @Delete('delete/:id')
    async deleteSetor(@Param('id') id: number){
        return await this.setorService.deleteSetor(id);
    }

};