import { IsString, IsEmail, IsBoolean, IsOptional, IsUrl, IsInt, IsEnum } from 'class-validator';
import { StatusCandidatura } from 'src/model/candidatura.entity';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateCandidaturaDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nomeCompleto?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiProperty()
  @IsString()
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