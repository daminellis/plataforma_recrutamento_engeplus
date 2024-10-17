import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VagaTag} from "../model/vagatag.entity";
import { VagaTagService } from "src/service/vagatag.service";
import { VagaTagController } from "src/controller/vagatag.controller";
import Tag from "src/model/tag.entity";
import { TagService } from "src/service/tag.service";

@Module({
    imports: [TypeOrmModule.forFeature([VagaTag, Tag])],
    controllers: [VagaTagController],
    providers: [VagaTagService, TagService],
    exports: [VagaTagService]
})
export class VagaTagModule {}