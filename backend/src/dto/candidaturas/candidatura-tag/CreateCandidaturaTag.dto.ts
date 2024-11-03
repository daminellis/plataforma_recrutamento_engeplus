import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCandidaturaTagDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    corTag: string;
}