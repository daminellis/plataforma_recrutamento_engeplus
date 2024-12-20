import { IsString, IsEmail, IsNumber, IsNotEmpty, IsOptional, Length, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoUsuarioEnum } from '../../model/usuario.entity';
export class UpdateUsuarioDto {

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  nomeCompleto?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @Length(8, 50)
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  senha?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cargoId?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  setorId?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TipoUsuarioEnum)
  tipoUsuario?: TipoUsuarioEnum;
}