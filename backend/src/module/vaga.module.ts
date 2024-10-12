import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import Vaga from "src/model/vaga.entity";
import { VagaController } from "../controller/vaga.controller";
import { VagaService } from "../service/vaga.service";

@Module({
    imports: [TypeOrmModule.forFeature([Vaga])],
    providers: [VagaService],
    controllers: [VagaController]
})
export class VagaModule{};