import { Controller, Get, Post, Put, Delete, Param, Body} from "@nestjs/common";
import { CargoService } from "../service/cargo.service";
import { CreateCargoDto } from "src/dto/cargos/CreateCargo.dto";
import { UpdateCargoDto } from "src/dto/cargos/UpdateCargo.dto";
import Cargo from "src/model/cargo.entity";
import { AllowUserTypes } from "src/auth/decorators/AllowedUserTypes.decorator";
import { SuccessResponseDto } from "src/dto/responses/SuccessResponse.dto";

@Controller('cargos')
@AllowUserTypes('Administrador')
export class CargoController{
    constructor(private cargoService: CargoService){}

    @Get('/all')
    async findAllCargos(): Promise<Cargo[]>{
        return this.cargoService.findAll();
    }

    @Get('/find/:id')
    async findOneCargo(@Param('id') id: number): Promise<Cargo | null>{
        return this.cargoService.findOne(id);
    }

    @Post('/create')
    async create(@Body() createCargoDto: CreateCargoDto): Promise<SuccessResponseDto>{
        return this.cargoService.create(createCargoDto);
    }

    @Put('/update/:id')
    async update(@Param('id') id: number, @Body() updateCargoDto: UpdateCargoDto): Promise<SuccessResponseDto>{
        return this.cargoService.update(id, updateCargoDto);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number): Promise<void>{
        return this.cargoService.delete(id);
    }
};