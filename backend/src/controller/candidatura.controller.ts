import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CandidaturaService } from "../service/candidatura.service";
import { CreateCandidaturaDto } from "src/dto/candidaturas/CreateCandidatura.dto";
import { UpdateCandidaturaDto } from "src/dto/candidaturas/UpdateCandidatura.dto";
@Controller('candidaturas')
export class CandidaturaController {
    constructor(private candidaturaService: CandidaturaService) {}

    @Get('all')
    async findAllCandidaturas() {
        return this.candidaturaService.findAllCandidaturas();
    }

    @Get('find/:id')
    async findOneCandidatura(@Param('id') id: number) {
        return this.candidaturaService.findOneCandidatura(id);
    }

    @Post('create')
    async create(@Body() createCandidaturaDto: CreateCandidaturaDto) {
        return this.candidaturaService.create(createCandidaturaDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() updateCandidaturaDto: UpdateCandidaturaDto) {
        return this.candidaturaService.update(id, updateCandidaturaDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return this.candidaturaService.delete(id);
    }
}