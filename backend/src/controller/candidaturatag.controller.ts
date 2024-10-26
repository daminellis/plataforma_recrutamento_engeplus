import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {CandidaturaTag} from '../model/candidaturatag.entity'
import { CreateCandidaturaTagDto } from "src/dto/candidaturas/candidatura-tag/CreateCandidaturaTag.dto";
import { UpdateCandidaturaTagDto } from "src/dto/candidaturas/candidatura-tag/UpdateCandidaturatag.dto";
import { CandidaturaTagService } from "src/service/candidaturatag.service";
@Controller('candidaturatags')
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

    @Post('create')
    async create(@Body() createCandidaturaTagDto: CreateCandidaturaTagDto): Promise<CandidaturaTag>{
        return this.candidaturaTagService.create(createCandidaturaTagDto)
    }

    @Put('update')
    async update(@Param("id") id: number,@Body() updateCandidaturaTagDto:UpdateCandidaturaTagDto): Promise<CandidaturaTag>{
        return this.candidaturaTagService.update(id, updateCandidaturaTagDto)
    }

    @Delete('delete')
    async delete(@Param('id') id: number): Promise<void>{
        return this.candidaturaTagService.delete(id)
    }
}