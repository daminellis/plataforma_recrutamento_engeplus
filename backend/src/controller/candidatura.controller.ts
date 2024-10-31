import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CandidaturaService } from "../service/candidatura.service";
import { CreateCandidaturaDto } from "src/dto/candidaturas/CreateCandidatura.dto";
import { UpdateCandidaturaDto } from "src/dto/candidaturas/UpdateCandidatura.dto";
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import Candidatura from "src/model/candidatura.entity";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
import { Public } from "src/auth/decorators/public.decorator";
import { GetUserType } from "src/auth/decorators/auth.decorator";
import { TipoUsuarioEnum } from "src/model/usuario.entity";
@Controller('candidaturas')
export class CandidaturaController {
    constructor(private candidaturaService: CandidaturaService) {}
    @Get('/all')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Lider')
    async findAllCandidaturas(@GetUserType('Lider') userType: TipoUsuarioEnum): Promise<Candidatura[]> {
        console.log('User Type:', userType);
        if ( userType === 'Lider') {
            return this.candidaturaService.findAllLiderCandidaturas();
        }
        return this.candidaturaService.findAllCandidaturas();
    }

    @Get('/find/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Lider')
    async findOneCandidatura(@Param('id') id: number): Promise<Candidatura | null> {
        return this.candidaturaService.findOneCandidatura(id);
    }

    @Get('/find/all-by-vaga/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async findAllByCandidature(@Param('id') vagaId: number): Promise<Candidatura[] | null>{
        return this.candidaturaService.findAllByCandidature(vagaId)
    }

    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    @Public()
    async create(
        @UploadedFile() file: File,
        @Body() createCandidaturaDto: CreateCandidaturaDto,
    ): Promise<Candidatura> {
        if (file && file.buffer) {
            createCandidaturaDto.cvData.buffer = file.buffer;
            createCandidaturaDto.cvData.type = file.mimetype;
            console.log('File buffer:', createCandidaturaDto.cvData); 
        } else {
            throw new Error ('File or file buffer is undefined');
        }
        return this.candidaturaService.create(createCandidaturaDto);
    }

    @Put('/update/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async update(@Param('id') id: number, @Body() updateCandidaturaDto: UpdateCandidaturaDto): Promise<Candidatura> {
        return this.candidaturaService.update(id, updateCandidaturaDto);
    }

    @Delete('/delete/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async delete(@Param('id') id: number): Promise<void> {
        return this.candidaturaService.delete(id);
    }
}