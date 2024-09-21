import { IsString, IsEmail,IsNumber, IsNotEmpty, IsOptional, Length, IsArray } from 'class-validator';

export class UpdateUsuarioDto { 
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  nomeCompleto?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @Length(8, 50)
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(4, 8)
  senhaHash?: string;

  @IsOptional()
  @IsNumber()
  cargoId?: number;

  @IsOptional()
  @IsNumber()
  setorId?: number;

  @IsOptional()
  @IsArray()
  vagaIds?: number[];
}