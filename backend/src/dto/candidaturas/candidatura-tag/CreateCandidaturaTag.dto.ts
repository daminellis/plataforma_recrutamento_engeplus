import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateCandidaturaTagDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsString()
    @MaxLength(7)
    corTag: string;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    candidaturaIds: number[];
}