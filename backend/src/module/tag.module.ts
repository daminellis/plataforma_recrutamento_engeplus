import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tag} from "../model/tag.entity";
import { TagService } from "src/service/tag.service";
import { TagController } from "src/controller/tag.controller";
import VagaTag from "src/model/vagatag.entity";
import { VagaTagService } from "src/service/vagatag.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tag, VagaTag])],
    controllers: [TagController],
    providers: [TagService, VagaTagService],
    exports: [TagService]
})
export class TagModule {}