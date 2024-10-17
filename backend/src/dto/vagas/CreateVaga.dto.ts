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
  Matches,
} from 'class-validator';
import {
  NivelDeEducacao,
  TempoDeExperiencia,
  NivelDeExperiencia,
  Modalidade,
} from '../../model/vaga.entity';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateVagaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  titulo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(99999999.99)
  salarioMinimo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(99999999.99)
  salarioMaximo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(NivelDeEducacao)
  educacao: NivelDeEducacao;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TempoDeExperiencia)
  tempoExperiencia: TempoDeExperiencia;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(NivelDeExperiencia)
  nivelExperiencia: NivelDeExperiencia;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Modalidade)
  modalidade: Modalidade;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantidadeVagas: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  dataExpiracao: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsArray()
  responsabilidades: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+ - [A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
  regiao: string;

  @ApiProperty()
  tempoPostado: string;

  @ApiProperty()
  @Type(() => Date)
  dataPostagem: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  disponivel: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  recruiterId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  setorId: number;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  candidaturaIds: number[];

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  vagatagIds: number[];
}
