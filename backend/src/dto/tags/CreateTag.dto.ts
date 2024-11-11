import {IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nome: string;

  @ApiProperty()
  @IsOptional()
  @Length(7,7)
  @IsString()
  corTag: string;
}