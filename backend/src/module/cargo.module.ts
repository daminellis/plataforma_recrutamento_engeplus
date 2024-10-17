import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Cargo from "src/model/cargo.entity";
import { CargoController } from "../controller/cargo.controller";
import { CargoService } from "../service/cargo.service";


@Module({
    imports: [TypeOrmModule.forFeature([Cargo])],
    controllers: [CargoController],
    providers: [CargoService],
    exports: [CargoService]
})
export class CargoModule{};