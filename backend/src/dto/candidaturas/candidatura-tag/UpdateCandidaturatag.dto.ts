import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator'

export class UpdateCandidaturaTagDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    nome?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    corTag?: string;

    @ApiProperty({type: [Number]})
    @IsOptional()
    @IsArray()
    candidaturaIds?: number[];
}