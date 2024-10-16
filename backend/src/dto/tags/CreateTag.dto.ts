import { IsArray, IsNotEmpty, IsString } from 'class-validator'; 
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
  @IsNotEmpty()
  @IsArray()
  vagatagIds: number[];
}