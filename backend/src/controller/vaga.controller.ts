import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from "@nestjs/common";
import { VagaService } from "../service/vaga.service";
import { Vaga } from "../model/vaga.entity";
import { CreateVagaDto } from "src/dto/vagas/CreateVaga.dto";
import { UpdateVagaDto } from "../dto/vagas/UpdateVaga.dto";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
import { UserTypeGuard } from "src/auth/guards/UserTypeGuard.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller('vagas')
export class VagaController {
    constructor(private vagaService: VagaService) {}
    @Get('/all')
    async findAll(): Promise<Vaga[]> {
        return this.vagaService.findAllVagas();
    }

    @Get('/disponiveis')
    async findDisponiveis(): Promise<Vaga[] | null> {
        return this.vagaService.findVagasDisponiveis();
    }

    @Get('/find/:id')
    async findOne(@Param('id') id: number): Promise<Vaga | null> {
        return this.vagaService.findOneVaga(id);
    }

    @Post('/create')
    @UseGuards(AuthGuard,UserTypeGuard)
    @AllowUserTypes('Administrador', 'Recursos Humanos')
    async createVaga(@Body() createVagaDto: CreateVagaDto): Promise<Vaga> {
        return this.vagaService.createVaga(createVagaDto);
    }

    @Put('/update/:id')
    async updateVaga(@Param('id') id: number, @Body() updateVagaDto: UpdateVagaDto): Promise<Vaga> {
        return this.vagaService.updateVaga(id, updateVagaDto);
    }

    @Delete('/delete/:id')
    async deleteVaga(@Param('id') id: number): Promise<void> {
        return this.vagaService.deleteVaga(id);
    }

    @Delete('/delete/allNull')
    async deleteAllNull(): Promise<void> {
        return this.vagaService.deleteAllNullVagas();
    }
};