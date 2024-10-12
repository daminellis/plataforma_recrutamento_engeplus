import { IsNotEmpty, IsString, IsInt, IsNumber, IsEnum, IsBoolean, IsOptional, IsDate, Max, Min } from 'class-validator';
import { NivelDeEducacao, TempoDeExperiencia, NivelDeExperiencia, Modalidade } from '../../model/vaga.entity';
import { Type } from 'class-transformer';

export class UpdateVagaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99999999.99)
  salarioMinimo?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99999999.99)
  salarioMaximo?: number;

  @IsOptional()
  @IsEnum(NivelDeEducacao)
  educacao?: NivelDeEducacao;

  @IsOptional()
  @IsEnum(TempoDeExperiencia)
  tempoExperiencia?: TempoDeExperiencia;

  @IsOptional()
  @IsEnum(NivelDeExperiencia)
  nivelExperiencia?: NivelDeExperiencia;

  @IsOptional()
  @IsEnum(Modalidade)
  modalidade?: Modalidade;

  @IsOptional()
  @IsInt()
  quantidadeVagas?: number;

  @IsOptional()
  // @Type(() => Date)
  dataExpiracao?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  responsabilidades?: string;

  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;

  @IsOptional()
  @IsInt()
  recruiterId?: number;

  @IsOptional()
  @IsInt()
  setorId?: number;
}