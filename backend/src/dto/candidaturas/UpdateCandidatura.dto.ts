import { IsString, IsEmail, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class UpdateCandidaturaDto {
  @IsString()
  @IsOptional()
  nomeCompleto?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsUrl()
  @IsOptional()
  cvUrl?: string;

  @IsBoolean()
  @IsOptional()
  favorito?: boolean;
}