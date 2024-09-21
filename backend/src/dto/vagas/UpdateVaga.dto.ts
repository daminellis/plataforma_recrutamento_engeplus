import { IsNotEmpty, IsString, IsInt, IsNumber, IsEnum, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { NivelDeEducacao, TempoDeExperiencia, NivelDeExperiencia, Modalidade } from '../../model/vaga.entity';

export class UpdateVagaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsNumber()
  salarioMinimo?: number;

  @IsOptional()
  @IsNumber()
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
  @IsDate()
  dataExperiacao?: Date;

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