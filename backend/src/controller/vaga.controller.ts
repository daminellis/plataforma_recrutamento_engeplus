import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { VagaService } from "../service/vaga.service";
import { Vaga } from "../model/vaga.entity";
import { CreateVagaDto } from "src/dto/vagas/CreateVaga.dto";
import { UpdateVagaDto } from "../dto/vagas/UpdateVaga.dto";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
import { Public } from "src/auth/decorators/public.decorator";
import { GetUserType } from "src/auth/decorators/auth.decorator";
import { TipoUsuarioEnum } from "src/model/usuario.entity";
import { ResponseCountCandidatureDto } from "src/dto/vagas/ResponseCountCandidature.dto";

@Controller('vagas')
export class VagaController {
    constructor(private vagaService: VagaService) {}

    @Get('/all')
    @Public()
    async findAll(): Promise<Vaga[]> {
        return this.vagaService.findAllVagas();
    }

    @Get('/all-private')
    @AllowUserTypes('Administrador', 'Recursos Humanos', 'Lider')
    async findAllPrivate(@GetUserType('Lider') userType: TipoUsuarioEnum): Promise<ResponseCountCandidatureDto[]> {
        const allVagas= await this.vagaService.findAllVagasWithCandidateCount()
    
        if (userType === 'Lider'){
            const candidaturaPorLiderVagas= await this.vagaService.findAllWithCandidateCountByLiderSetor()
            console.log("Lider")
            return candidaturaPorLiderVagas;
        }

        return allVagas;
    }

    @Get('/disponiveis')
    @Public()
    async findDisponiveis(): Promise<Vaga[] | null> {
        return this.vagaService.findVagasDisponiveis();
    }

    @Get('/find/:id')
    @Public()
    async findOne(@Param('id') id: number): Promise<Vaga | null> {
        return this.vagaService.findOneVaga(id);
    }

    @Post('/create')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async createVaga(@Body() createVagaDto: CreateVagaDto): Promise<Vaga> {
        return this.vagaService.createVaga(createVagaDto);
    }

    @Put('/update/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async updateVaga(@Param('id') id: number, @Body() updateVagaDto: UpdateVagaDto): Promise<Vaga> {
        return this.vagaService.updateVaga(id, updateVagaDto);
    }

    @Delete('/delete/:id')
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async deleteVaga(@Param('id') id: number): Promise<void> {
        return this.vagaService.deleteVaga(id);
    }

    @Delete('/delete/allNull')
    @AllowUserTypes('Administrador')
    async deleteAllNull(): Promise<void> {
        return this.vagaService.deleteAllNullVagas();
    }
};