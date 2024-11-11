import {IsOptional, IsString, Length, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateCargoDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3, 50)
    nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(255)
    descricao: string;
}