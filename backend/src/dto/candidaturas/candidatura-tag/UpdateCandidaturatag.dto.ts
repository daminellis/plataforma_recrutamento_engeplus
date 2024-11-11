import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length, MaxLength } from 'class-validator'

export class UpdateCandidaturaTagDto{

    @ApiProperty()
    @IsOptional()
    @MaxLength(50)
    @IsString()
    nome?: string;
  
    @ApiProperty()
    @IsOptional()
    @Length(7,7)
    @IsString()
    corTag?: string;
}