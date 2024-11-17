import { Length, IsString, IsEmail, IsNotEmpty } from 'class-validator';
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
    cvType: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    vagaId: string;

}