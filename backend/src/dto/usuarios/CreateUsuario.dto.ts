import { IsEmail, IsNotEmpty, IsString, Length, IsNumber, IsArray, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoUsuarioEnum } from '../../model/usuario.entity';
export class CreateUsuarioDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  nomeCompleto: string;

  @ApiProperty()
  @IsEmail()
  @Length(8, 50)
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 60)
  senha: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(TipoUsuarioEnum)
  tipoUsuario: TipoUsuarioEnum;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cargoId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  setorId: number;
}