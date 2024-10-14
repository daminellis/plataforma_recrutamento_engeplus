import { Length, IsString, IsEmail, IsBoolean, IsOptional, IsInt, IsUrl, IsNotEmpty, Max } from 'class-validator';
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
    @IsNotEmpty()
    @IsUrl()
    @IsOptional()
    @Length(0, 512)
    cvUrl?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    favorito?: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    vagaId: number;
}