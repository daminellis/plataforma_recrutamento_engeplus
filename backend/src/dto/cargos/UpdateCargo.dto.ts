import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCargoDto {
    @IsOptional()
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao: string;
}