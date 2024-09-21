import { Controller } from "@nestjs/common";
import { VagaService } from "../service/vaga.service";
import { Vaga } from "../model/vaga.entity";
import { CreateVagaDto } from "src/dto/vagas/CreateVaga.dto";
import { UpdateVagaDto } from "../dto/vagas/UpdateVaga.dto";
@Controller('vagas')
export class VagaController{
    
};