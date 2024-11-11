import { IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateCargoDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(3, 50)
    @IsString()
    nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(255)
    descricao: string;
}