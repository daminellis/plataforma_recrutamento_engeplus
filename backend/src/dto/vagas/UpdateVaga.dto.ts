import {IsString, IsInt, IsNumber, IsEnum, IsBoolean, IsOptional, Max, Min, IsArray } from 'class-validator';
import { NivelDeEducacao, TempoDeExperiencia, NivelDeExperiencia, Modalidade } from '../../model/vaga.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateVagaDto {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ required: false, type: Number, minimum: 0, maximum: 99999999.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99999999.99)
  salarioMinimo?: number;

  @ApiProperty({ required: false, type: Number, minimum: 0, maximum: 99999999.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99999999.99)
  salarioMaximo?: number;

  @ApiProperty({ required: false, enum: NivelDeEducacao })
  @IsOptional()
  @IsEnum(NivelDeEducacao)
  educacao?: NivelDeEducacao;

  @ApiProperty({ required: false, enum: TempoDeExperiencia })
  @IsOptional()
  @IsEnum(TempoDeExperiencia)
  tempoExperiencia?: TempoDeExperiencia;

  @ApiProperty({ required: false, enum: NivelDeExperiencia })
  @IsOptional()
  @IsEnum(NivelDeExperiencia)
  nivelExperiencia?: NivelDeExperiencia;

  @ApiProperty({ required: false, enum: Modalidade })
  @IsOptional()
  @IsEnum(Modalidade)
  modalidade?: Modalidade;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsInt()
  quantidadeVagas?: number;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsOptional()
  @Type(() => Date)
  dataExpiracao?: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  responsabilidades?: string;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsInt()
  recruiterId?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsInt()
  setorId?: number;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  candidaturaIds?: number[];
  
  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsOptional()
  tagIds?: number[];
}