import {IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCargoDto {
    @IsOptional()
    @IsInt()
    id: number;

    @IsOptional()
    @IsString()
    nome: string;
    
    @IsOptional()
    @IsString()
    descricao: string;
}