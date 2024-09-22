import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { VagaService } from "../service/vaga.service";
import { Vaga } from "../model/vaga.entity";
import { CreateVagaDto } from "src/dto/vagas/CreateVaga.dto";
import { UpdateVagaDto } from "../dto/vagas/UpdateVaga.dto";

@Controller('vagas')
export class VagaController {
    constructor(private vagaService: VagaService) {}
    @Get('/all')
    async findAll(): Promise<Vaga[]> {
        return this.vagaService.findAllVagas();
    }

    @Get('/find/:id')
    async findOne(@Param('id') id: number): Promise<Vaga | null> {
        return this.vagaService.findOneVaga(id);
    }

    @Post('/create')
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
};