import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tag} from "../model/tag.entity";
import { TagService } from "src/service/tag.service";
import { TagController } from "src/controller/tag.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    controllers: [TagController],
    providers: [TagService],
})
export class TagModule {}