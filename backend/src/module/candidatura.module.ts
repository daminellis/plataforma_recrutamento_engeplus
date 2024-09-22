import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Candidatura} from "../model/candidatura.entity";
import { CandidaturaController } from "src/controller/candidatura.controller";
import { CandidaturaService } from "src/service/candidatura.service";

@Module({
    imports: [TypeOrmModule.forFeature([Candidatura])],
    controllers: [CandidaturaController],
    providers: [CandidaturaService],
})
export class CandidaturaModule {}