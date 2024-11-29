import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { VagaService } from "../service/vaga.service";
import { Modalidade, NivelDeEducacao, NivelDeExperiencia, TempoDeExperiencia, Vaga } from "../model/vaga.entity";
import { CreateVagaDto } from "src/dto/vagas/CreateVaga.dto";
import { UpdateVagaDto } from "../dto/vagas/UpdateVaga.dto";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
import { Public } from "src/auth/decorators/public.decorator";
import { GetUserType } from "src/auth/decorators/auth.decorator";
import { TipoUsuarioEnum } from "src/model/usuario.entity";
import { ResponseCountCandidatureDto } from "src/dto/vagas/ResponseCountCandidature.dto";
import { SuccessResponseDto } from "src/dto/responses/SuccessResponse.dto";

@Controller('vagas')
export class VagaController {
    constructor(private vagaService: VagaService) { }

    @Get('/enums')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async findVagaEnums(): Promise<{ tempoDeExperiencia: typeof TempoDeExperiencia, nivelDeEducacao: typeof NivelDeEducacao, nivelDeExperiencia: typeof NivelDeExperiencia, modalidade: typeof Modalidade }> {
        return this.vagaService.getEnums()
    }

    @Get('/all')
    @Public()
    async findAll(): Promise<Vaga[]> {
        return this.vagaService.findAllVagas();
    }

    @Get('/all-private')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async findAllPrivate(@GetUserType('Líder') userType: TipoUsuarioEnum): Promise<ResponseCountCandidatureDto[]> {
        const allVagas = await this.vagaService.findAllPrivateVagas()

        if (userType === 'Líder') {
            const candidaturaPorLiderVagas = await this.vagaService.findAllPrivateVagasByLider()
            return candidaturaPorLiderVagas;
        }

        return allVagas;
    }

    @Get('/find/:id')
    @Public()
    async findOne(@Param('id') id: number): Promise<Vaga | null> {
        return this.vagaService.findOneVaga(id);
    }

    @Post(':id/expirar')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async markAsExpired(@Param('id') id: number): Promise<SuccessResponseDto> {
        return this.vagaService.markAsExpired(id);
    }

    @Post(':id/ativar')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
    async markAsAvailable(@Param('id') id: number): Promise<SuccessResponseDto> {
        return this.vagaService.markAsAvailable(id);
    }

    @Post('/create')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async createVaga(@Body() createVagaDto: CreateVagaDto): Promise<SuccessResponseDto> {
        return this.vagaService.createVaga(createVagaDto);
    }

    @Put('/update/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async updateVaga(@Param('id') id: number, @Body() updateVagaDto: UpdateVagaDto): Promise<SuccessResponseDto> {
        return this.vagaService.updateVaga(id, updateVagaDto);
    }

    @Delete('/delete/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async deleteVaga(@Param('id') id: number): Promise<void> {
        return this.vagaService.deleteVaga(id);
    }
};