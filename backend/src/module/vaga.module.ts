import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import Vaga from "src/model/vaga.entity";
import { VagaController } from "../controller/vaga.controller";
import { VagaService } from "../service/vaga.service";
import { UsuarioModule } from "./usuario.module";
import { SetorModule } from "./setor.module";
import { CandidaturaModule } from "./candidatura.module";
import { TagModule } from "./tag.module";
import Candidatura from "src/model/candidatura.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Vaga, Candidatura]), UsuarioModule, SetorModule, CandidaturaModule,TagModule],
    providers: [VagaService],
    controllers: [VagaController],
    exports: [VagaService]
})
export class VagaModule{};