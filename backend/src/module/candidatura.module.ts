import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Candidatura} from "../model/candidatura.entity";
import { CandidaturaController } from "src/controller/candidatura.controller";
import { CandidaturaService } from "src/service/candidatura.service";
import { FastifyMulterModule } from '@nest-lab/fastify-multer'
import { VagaModule } from "./vaga.module";
import { CandidaturaTagModule } from "./candidaturatag.module";
import { EmailModule } from "src/email/email.module";

@Module({
    imports: [TypeOrmModule.forFeature([Candidatura]), FastifyMulterModule,VagaModule, CandidaturaTagModule, EmailModule],
    controllers: [CandidaturaController],
    providers: [CandidaturaService],
    exports: [CandidaturaService]
})
export class CandidaturaModule {}