import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(7)
  @IsString()
  corTag: string;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  vagaIds: number[];
}