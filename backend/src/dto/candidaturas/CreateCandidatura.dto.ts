import { Length, IsString, IsEmail, IsBoolean, IsOptional, IsInt, IsUrl, IsNotEmpty, Max } from 'class-validator';

export class CreateCandidaturaDto {

    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    nomeCompleto: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(8, 50)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    telefone: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 2000)
    descricao: string;

    @IsNotEmpty()
    @IsUrl()
    @IsOptional()
    @Length(0, 512)
    cvUrl?: string;

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    favorito?: boolean;

    @IsNotEmpty()
    @IsInt()
    vagaId: number;
}