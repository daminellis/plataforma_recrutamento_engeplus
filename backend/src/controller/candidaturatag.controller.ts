import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {CandidaturaTag} from '../model/candidaturatag.entity'
import { CreateCandidaturaTagDto } from "src/dto/candidaturas/candidatura-tag/CreateCandidaturaTag.dto";
import { UpdateCandidaturaTagDto } from "src/dto/candidaturas/candidatura-tag/UpdateCandidaturatag.dto";
import { CandidaturaTagService } from "src/service/candidaturatag.service";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
import { SuccessResponseDto } from "src/dto/responses/SuccessResponse.dto";
@Controller('candidaturatags')
@AllowUserTypes('Administrador', 'Recursos Humanos')
export class CandidaturaTagController {
    constructor(private candidaturaTagService: CandidaturaTagService) {}

    @Get('/all')
    async getAll(): Promise<CandidaturaTag[]>{
        return this.candidaturaTagService.findAll()
    }

    @Get('/find/:id')
    async getOne(@Param("id") id:number): Promise<CandidaturaTag | null>{
        return this.candidaturaTagService.findOne(id)
    }

    @Post('/create')
    async create(@Body() createCandidaturaTagDto: CreateCandidaturaTagDto): Promise<SuccessResponseDto>{
        return this.candidaturaTagService.create(createCandidaturaTagDto)
    }

    @Put('/update/:id')
    async update(@Param("id") id: number,@Body() updateCandidaturaTagDto:UpdateCandidaturaTagDto): Promise<SuccessResponseDto>{
        return this.candidaturaTagService.update(id, updateCandidaturaTagDto)
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number): Promise<void>{
        return this.candidaturaTagService.delete(id)
    }
}