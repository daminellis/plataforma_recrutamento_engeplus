import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  Length,
  Min,
  Max,
  IsDate,
  IsBoolean,
  IsArray,
  IsOptional,
  isDate,
} from 'class-validator';
import {
  NivelDeEducacao,
  TempoDeExperiencia,
  NivelDeExperiencia,
  Modalidade,
} from '../../model/vaga.entity';
import { Type } from 'class-transformer';
export class CreateVagaDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  titulo: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(99999999.99)
  salarioMinimo: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(99999999.99)
  salarioMaximo: number;

  @IsNotEmpty()
  @IsEnum(NivelDeEducacao)
  educacao: NivelDeEducacao;

  @IsNotEmpty()
  @IsEnum(TempoDeExperiencia)
  tempoExperiencia: TempoDeExperiencia;

  @IsNotEmpty()
  @IsEnum(NivelDeExperiencia)
  nivelExperiencia: NivelDeExperiencia;

  @IsNotEmpty()
  @IsEnum(Modalidade)
  modalidade: Modalidade;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantidadeVagas: number;

  @IsNotEmpty()
  @Type(() => Date)
  dataExpiracao: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  responsabilidades: string;

  @IsNotEmpty()
  @IsBoolean()
  disponivel: boolean;

  @IsNotEmpty()
  @IsArray()
  recruiterIds: number[];

  @IsNotEmpty()
  @IsNumber()
  setorId: number;

  @IsNotEmpty()
  @IsArray()
  candidaturaIds: number[];

  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  vagatagIds: number[];
}
