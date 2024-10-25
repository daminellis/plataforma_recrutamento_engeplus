import { IsString, IsEmail, IsBoolean, IsOptional, IsUrl, IsInt } from 'class-validator';
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
  @IsUrl()
  @IsOptional()
  cvUrl?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  favorito?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  statusId?: number
}