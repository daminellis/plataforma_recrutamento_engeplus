import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CandidaturaService } from "../service/candidatura.service";
import { CreateCandidaturaDto } from "src/dto/candidaturas/CreateCandidatura.dto";
import { UpdateCandidaturaDto } from "src/dto/candidaturas/UpdateCandidatura.dto";
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import Candidatura from "src/model/candidatura.entity";
@Controller('candidaturas')
export class CandidaturaController {
    constructor(private candidaturaService: CandidaturaService) {}

    @Get('all')
    async findAllCandidaturas(): Promise<Candidatura[]> {
        return this.candidaturaService.findAllCandidaturas();
    }

    @Get('find/:id')
    async findOneCandidatura(@Param('id') id: number): Promise<Candidatura | null> {
        return this.candidaturaService.findOneCandidatura(id);
    }

    @Get('find/all-by-vaga/:id')
    async findAllByCandidature(@Param('id') vagaId: number): Promise<Candidatura[] | null>{
        return this.candidaturaService.findAllByCandidature(vagaId)
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: File,
        @Body() createCandidaturaDto: CreateCandidaturaDto,
    ): Promise<Candidatura> {
        console.log('File received:', file);
        if (file && file.buffer) {
            createCandidaturaDto.cvData = file.buffer;
            console.log('File buffer:', createCandidaturaDto.cvData); 
        } else {
            console.log('File or file buffer is undefined');
        }
        return this.candidaturaService.create(createCandidaturaDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() updateCandidaturaDto: UpdateCandidaturaDto): Promise<Candidatura> {
        return this.candidaturaService.update(id, updateCandidaturaDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.candidaturaService.delete(id);
    }
}