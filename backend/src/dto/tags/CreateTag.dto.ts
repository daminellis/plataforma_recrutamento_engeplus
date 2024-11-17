import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nome: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(7)
  @IsString()
  corTag: string;
}