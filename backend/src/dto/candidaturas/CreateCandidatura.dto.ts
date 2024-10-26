import { Length, IsString, IsEmail, IsInt, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCandidaturaDto {

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
    @IsNotEmpty()
    @IsString()
    vagaId: string;

}