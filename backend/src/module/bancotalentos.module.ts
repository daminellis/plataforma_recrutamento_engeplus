import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BancoTalentosController } from "src/controller/bancotalentos.controller";
import BancoTalentos from "src/model/bancotalentos.entity";
import { BancoTalentosService } from "src/service/bancotalentos.service";

@Module({
    imports: [TypeOrmModule.forFeature([BancoTalentos])],
    controllers: [BancoTalentosController],
    providers: [BancoTalentosService],
    exports: [BancoTalentosService]
})
export class BancoTalentosModule{};