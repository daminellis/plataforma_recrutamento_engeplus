import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateCandidaturaTagDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    nome: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(7)
    corTag: string;
}