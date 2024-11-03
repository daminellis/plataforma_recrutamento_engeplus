import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BancoTalentosService } from "../service/bancotalentos.service";
import { CreateTalentoDto } from "src/dto/bancotalentos/CreateTalento.dto";
import BancoTalentos from "src/model/bancotalentos.entity";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
@Controller()
@AllowUserTypes('Administrador', 'Recursos Humanos', 'Líder')
export class BancoTalentosController{
    constructor(private bancoTalentosService: BancoTalentosService) { }

    @Get('/all')
    async getTalentos(): Promise<BancoTalentos[]> {
        return this.bancoTalentosService.getTalentos();
    }

    @Get('/find/:id')
    async getOneTalento(@Param('id') id: number): Promise<BancoTalentos | null> {
        return this.bancoTalentosService.getOneTalento(id);
    }

    @Post('/create')
    async create(@Body() createTalentoDto: CreateTalentoDto): Promise<BancoTalentos> {
        return this.bancoTalentosService.create(createTalentoDto);
    }

    @Post('/delete/:id')
    async delete(@Param('id') id: number) : Promise<void>{
        return this.bancoTalentosService.delete(id);
    }
};
