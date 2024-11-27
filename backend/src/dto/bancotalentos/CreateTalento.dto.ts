import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, IsEmail, IsInt } from "class-validator";

export class CreateTalentoDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    nomeCompleto: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Length(8, 50)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    telefone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(10, 2000)
    descricao: string;

    @ApiProperty()
    cvData: Buffer;

    @ApiProperty()
    cvType: string;

    @ApiProperty()
    @IsInt()
    vagaId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    vagaTitulo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(10, 3000)
    descricaoVaga: string;
}