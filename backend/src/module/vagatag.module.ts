import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VagaTag} from "../model/vagatag.entity";
import { VagaTagService } from "src/service/vagatag.service";
import { VagaTagController } from "src/controller/vagatag.controller";

@Module({
    imports: [TypeOrmModule.forFeature([VagaTag])],
    controllers: [VagaTagController],
    providers: [VagaTagService],
    exports: [VagaTagService]
})
export class VagaTagModule {}