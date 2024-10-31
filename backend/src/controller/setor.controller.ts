import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SetorService } from "../service/setor.service";
import { CreateSetorDto } from "../dto/setores/CreateSetor.dto";
import { UpdateSetorDto } from "src/dto/setores/UpdateSetor.dto";
import Setor from "src/model/setor.entity";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
import { Public } from "src/auth/decorators/public.decorator";

@Controller('setores')
export class SetorController{
    constructor(private setorService: SetorService){};

    @Get('/all')
    @Public()
    async findAllSetores(): Promise<Setor[]>{
        return await this.setorService.findAllSetores();
    }

    @Get('/find/:id')
    @Public()
    async findOneSetor(@Param('id') id: number): Promise<Setor | null>{
        return await this.setorService.findOneSetor(id);
    }

    @Post('/create')
    @AllowUserTypes('Administrador')
    async createSetor(@Body() createSetorDto: CreateSetorDto): Promise<Setor>{
        return await this.setorService.createSetor(createSetorDto);
    }

    @Put('/update/:id')
    @AllowUserTypes('Administrador')
    async updateSetor(@Param('id') id: number, @Body() updateSetorDto: UpdateSetorDto): Promise<Setor>{
        return await this.setorService.updateSetor(id, updateSetorDto);
    }

    @Delete('/delete/:id')
    @AllowUserTypes('Administrador')
    async deleteSetor(@Param('id') id: number): Promise<void>{
        return await this.setorService.deleteSetor(id);
    }

};