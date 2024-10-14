import { IsString, IsEmail, IsNumber, IsNotEmpty, IsOptional, Length, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @Length(4, 100)
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
  @Length(12, 60)
  senhaHash?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cargoId?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  setorId?: number;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  vagaIds?: number[];
}