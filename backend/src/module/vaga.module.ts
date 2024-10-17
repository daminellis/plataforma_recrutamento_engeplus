import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import Vaga from "src/model/vaga.entity";
import { VagaController } from "../controller/vaga.controller";
import { VagaService } from "../service/vaga.service";
import { UsuarioService } from "src/service/usuario.service";
import { SetorService } from "src/service/setor.service";
import { CandidaturaService } from "src/service/candidatura.service";
import { VagaTagService } from "src/service/vagatag.service";
import Usuario from "src/model/usuario.entity";
import Setor from "src/model/setor.entity";
import Candidatura from "src/model/candidatura.entity";
import VagaTag from "src/model/vagatag.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Vaga, Usuario, Setor, Candidatura, VagaTag])],
    providers: [VagaService, UsuarioService, SetorService, CandidaturaService, VagaTagService],
    controllers: [VagaController],
    exports: [VagaService]
})
export class VagaModule{};