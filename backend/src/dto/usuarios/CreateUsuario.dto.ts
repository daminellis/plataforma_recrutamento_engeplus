import {IsEmail, IsNotEmpty, IsString, Length, IsNumber, IsArray, IsOptional  } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @Length(4, 50)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 100)
  nomeCompleto: string;

  @IsEmail()
  @Length(8, 100)
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 16)
  senhaHash: string;

  @IsNumber()
  @IsNotEmpty()
  cargoId: number;

  @IsNumber()
  @IsNotEmpty()
  setorId: number;

  @IsArray()
  @IsOptional()
  vagaIds: number[];
}