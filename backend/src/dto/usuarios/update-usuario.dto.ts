import { IsString, IsEmail,IsNumber, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateUsuarioDto { 
  @IsOptional()
  @IsString()
  @Length(4, 50)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(4, 100)
  nomeCompleto?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 50)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(4, 8)
  senhaHash?: string;
}