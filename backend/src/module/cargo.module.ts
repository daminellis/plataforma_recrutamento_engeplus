import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Cargo from "src/model/cargo.entity";
import { CargoController } from "../controller/cargo.controller";
import { CargoService } from "../service/cargo.service";
import { UsuarioModule } from "./usuario.module";

@Module({
    imports: [TypeOrmModule.forFeature([Cargo]), UsuarioModule],
    controllers: [CargoController],
    providers: [CargoService],
    exports: [CargoService]
})
export class CargoModule{};