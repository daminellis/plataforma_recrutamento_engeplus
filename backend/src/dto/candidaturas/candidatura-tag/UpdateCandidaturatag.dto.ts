import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateCandidaturaTagDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(50)
    nome?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(7)
    corTag?: string;
}