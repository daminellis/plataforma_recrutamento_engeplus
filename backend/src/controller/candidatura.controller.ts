import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CandidaturaService } from "../service/candidatura.service";
import { CreateCandidaturaDto } from "src/dto/candidaturas/CreateCandidatura.dto";
import { UpdateCandidaturaDto } from "src/dto/candidaturas/UpdateCandidatura.dto";
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import { FileUploadDto } from "src/dto/candidaturas/FileUpload.dto";
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
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: File,
        @Body() createCandidaturaDto: CreateCandidaturaDto,
    ) {
        console.log('File received:', file);
        if (file && file.buffer) {
            createCandidaturaDto.cvData = file.buffer;
            console.log('File buffer:', createCandidaturaDto.cvData); 
        } else {
            console.log('File or file buffer is undefined');
        }
        return this.candidaturaService.create(createCandidaturaDto);
    }

    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: File) {
        return file;
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