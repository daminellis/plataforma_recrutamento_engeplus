import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateCargoDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    descricao: string;
}