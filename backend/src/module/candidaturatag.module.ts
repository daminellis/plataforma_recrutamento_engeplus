import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CandidaturaTagController } from "src/controller/candidaturatag.controller";
import CandidaturaTag from "src/model/candidaturatag.entity";
import { CandidaturaTagService } from "src/service/candidaturatag.service";

@Module({
    imports: [TypeOrmModule.forFeature([CandidaturaTag])],
    controllers: [CandidaturaTagController],
    providers: [CandidaturaTagService],
    exports: [CandidaturaTagService]
})
export class CandidaturaTagModule{};