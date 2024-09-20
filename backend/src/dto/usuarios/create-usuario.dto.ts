import {IsEmail, IsNotEmpty, IsString, Length  } from 'class-validator';

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
}