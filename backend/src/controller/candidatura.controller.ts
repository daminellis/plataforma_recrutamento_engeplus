import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CandidaturaService } from "../service/candidatura.service";
import { CreateCandidaturaDto } from "src/dto/candidaturas/CreateCandidatura.dto";
import { UpdateCandidaturaDto } from "src/dto/candidaturas/UpdateCandidatura.dto";
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import Candidatura, { StatusCandidatura } from "src/model/candidatura.entity";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
import { Public } from "src/auth/decorators/public.decorator";
import { GetUserType } from "src/auth/decorators/auth.decorator";
import { TipoUsuarioEnum } from "src/model/usuario.entity";
import { CustomHttpException } from "src/errors/exceptions/custom-exceptions";
import { SuccessResponseDto } from "src/dto/responses/SuccessResponse.dto";
@Controller('candidaturas')
export class CandidaturaController {
    constructor(private candidaturaService: CandidaturaService) { }

    @Get('/enum')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async getEnum(): Promise<{ statusCandidatura: typeof StatusCandidatura }> {
        return this.candidaturaService.getEnum();
    }

    @Get('/all')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async findAllCandidaturas(@GetUserType('Líder') userType: TipoUsuarioEnum): Promise<Candidatura[]> {
        console.log('User Type:', userType);
        if (userType === 'Líder') {
            return this.candidaturaService.findAllLiderCandidaturas();
        }
        return this.candidaturaService.findAllCandidaturas();
    }

    @Get('/find/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async findOneCandidatura(@Param('id') id: number): Promise<Candidatura | null> {
        return this.candidaturaService.findOneCandidatura(id);
    }

    @Get('/find/all-by-vaga/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async findAllCandidaturesByVaga(@Param('id') vagaId: number): Promise<Candidatura[] | null> {
        return this.candidaturaService.findAllByVaga(vagaId)
    }

    @Get('/:id/aprovar')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async aprovarCandidatura(@Param('id') id: string): Promise<SuccessResponseDto> {
        const idsArray = id.split(',').map(id => parseInt(id, 10));
        return this.candidaturaService.approveCandidatura(idsArray);
    }

    @Get('/:id/reprovar')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async reprovarCandidatura(@Param('id') id: number): Promise<SuccessResponseDto> {
        return this.candidaturaService.disapproveCandidatura(id);
    }

    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    @Public()
    async create(
        @UploadedFile() file: File,
        @Body() createCandidaturaDto: CreateCandidaturaDto,
    ): Promise<SuccessResponseDto> {
        if (file && file.buffer) {
            createCandidaturaDto.cvData = file.buffer;
            createCandidaturaDto.cvType = file.mimetype;

            const originalFileSize = file.size;
            const storedFileSize = createCandidaturaDto.cvData.length;

            if (originalFileSize !== storedFileSize) {
                throw new CustomHttpException('O tamanho do arquivo original não coincide com o tamanho dos dados armazenados', HttpStatus.BAD_REQUEST);
            } else {
                console.log('File size:', originalFileSize);
                console.log('Stored file size:', storedFileSize);
            }

        } else {
            throw new CustomHttpException('File or file buffer is undefined', 400);
        }
        return this.candidaturaService.create(createCandidaturaDto);
    }

    @Put('/update/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async update(@Param('id') id: number, @Body() updateCandidaturaDto: UpdateCandidaturaDto): Promise<SuccessResponseDto> {
        return this.candidaturaService.update(id, updateCandidaturaDto);
    }

    @Delete('/delete/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async delete(@Param('id') id: number): Promise<void> {
        return this.candidaturaService.delete(id);
    }
}