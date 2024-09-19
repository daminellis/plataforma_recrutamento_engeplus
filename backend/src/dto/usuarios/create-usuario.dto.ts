import {IsEmail, IsNotEmpty, IsString, Length  } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  username: string;

  @IsString()
  @Length(0, 100)
  nomeCompleto: string;

  @IsEmail()
  @Length(1, 100)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(4, 8)
  senhaHash: string;
}