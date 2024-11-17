import {IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateCargoDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(50)
    nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    descricao: string;
}