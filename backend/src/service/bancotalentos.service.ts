import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateTalentoDto } from "src/dto/bancotalentos/CreateTalento.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BancoTalentos } from "../model/bancotalentos.entity";
import { CustomHttpException } from "src/errors/exceptions/custom-exceptions";
@Injectable()
export class BancoTalentosService {

    constructor(
        @InjectRepository(BancoTalentos)
        private bancoTalentosRepository: Repository<BancoTalentos>
    ) { }
    
    async getTalentos(): Promise<BancoTalentos[]> {
        return this.bancoTalentosRepository.find({
            relations: ['vaga']
        });
    }
    async getOneTalento(id: number): Promise<BancoTalentos | null> {
        return this.bancoTalentosRepository.findOne({
            where: { id },
            relations: ['vaga']
        });
    }

    async create(createTalentoDto: CreateTalentoDto): Promise<BancoTalentos> {
        const talentos = this.bancoTalentosRepository.create(createTalentoDto);
        return this.bancoTalentosRepository.save(talentos);
    }

    async delete(id: number) : Promise<void>{
        const talento = await this.bancoTalentosRepository.findOneBy({id});

        if (!talento) {
            throw new CustomHttpException(`Talento com id ${id} não encontrado`, HttpStatus.NOT_FOUND);
        }
        
        await this.bancoTalentosRepository.delete(talento);
    }

}