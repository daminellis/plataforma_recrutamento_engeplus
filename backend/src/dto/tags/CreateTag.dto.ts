import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  corTag: string;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  vagaIds: number[];
}