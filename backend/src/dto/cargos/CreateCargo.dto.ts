import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateCargoDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descricao: string;
}