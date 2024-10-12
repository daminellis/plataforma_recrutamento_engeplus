import { Module } from "@nestjs/common";
import Setor from "src/model/setor.entity";
import { SetorController } from "../controller/setor.controller";
import { SetorService } from "../service/setor.service";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Setor])],
    providers: [SetorService],
    controllers: [SetorController]
})
export class SetorModule{};