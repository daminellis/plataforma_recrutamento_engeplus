import {forwardRef, Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Candidatura} from "../model/candidatura.entity";
import { CandidaturaController } from "src/controller/candidatura.controller";
import { CandidaturaService } from "src/service/candidatura.service";
import { FastifyMulterModule } from '@nest-lab/fastify-multer'

@Module({
    imports: [TypeOrmModule.forFeature([Candidatura]), FastifyMulterModule],
    controllers: [CandidaturaController],
    providers: [CandidaturaService],
    exports: [CandidaturaService]
})
export class CandidaturaModule {}