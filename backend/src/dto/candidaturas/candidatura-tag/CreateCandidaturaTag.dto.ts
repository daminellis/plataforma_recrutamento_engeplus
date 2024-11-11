import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator'

export class CreateCandidaturaTagDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    nome: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Length(7,7)
    corTag: string;
}