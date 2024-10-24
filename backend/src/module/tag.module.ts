import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tag} from "../model/tag.entity";
import { TagService } from "src/service/tag.service";
import { TagController } from "src/controller/tag.controller";
import { VagaTagModule } from "./vagatag.module";

@Module({
    imports: [TypeOrmModule.forFeature([Tag]), VagaTagModule],
    controllers: [TagController],
    providers: [TagService],
    exports: [TagService]
})
export class TagModule {}