import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, IsEmail } from "class-validator";

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
    @Length(10, 11)
    telefone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(10, 2000)
    descricao: string;

    @ApiProperty()
    cvData: Buffer;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    vagaId: string;
}