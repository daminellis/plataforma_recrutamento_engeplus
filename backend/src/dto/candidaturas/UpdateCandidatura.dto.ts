import { IsString, IsEmail, IsBoolean, IsOptional, IsUrl, IsInt, IsEnum, Length } from 'class-validator';
import { StatusCandidatura } from 'src/model/candidatura.entity';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateCandidaturaDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(4, 50)
  nomeCompleto?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @Length(8, 50)
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(10, 11)
  telefone?: string;

  @ApiProperty()
  @IsString()
  @Length(10, 2000)
  @IsOptional()
  descricao?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  favorito?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(StatusCandidatura)
  status?: StatusCandidatura;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  candidaturaTagId?: number
}