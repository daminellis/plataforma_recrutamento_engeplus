import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SetorService } from "../service/setor.service";
import { CreateSetorDto } from "../dto/setores/CreateSetor.dto";
import { UpdateSetorDto } from "src/dto/setores/UpdateSetor.dto";
import Setor from "src/model/setor.entity";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
import { Public } from "src/auth/decorators/public.decorator";
import { SuccessResponseDto } from "src/dto/responses/SuccessResponse.dto";

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
    async create(@Body() createSetorDto: CreateSetorDto): Promise<SuccessResponseDto>{
        return await this.setorService.create(createSetorDto);
    }

    @Put('/update/:id')
    @AllowUserTypes('Administrador')
    async update(@Param('id') id: number, @Body() updateSetorDto: UpdateSetorDto): Promise<SuccessResponseDto>{
        return await this.setorService.update(id, updateSetorDto);
    }

    @Delete('/delete/:id')
    @AllowUserTypes('Administrador')
    async delete(@Param('id') id: number): Promise<void>{
        return await this.setorService.delete(id);
    }

};