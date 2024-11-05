import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateCargoDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    descricao: string;
}