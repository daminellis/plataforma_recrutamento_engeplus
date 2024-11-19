import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  Length,
  Min,
  Max,
  IsArray,
  IsOptional,
  Matches,
  MaxLength,
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
  @Length(3, 100)
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
  dataExpiracao: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(10, 3000)
  descricao: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsArray()
  responsabilidades: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+ - [A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
  @MaxLength(50)
  regiao: string;

  @ApiProperty()
  @Type(() => Date)
  dataPostagem: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  recruiterId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  setorId: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsOptional()
  tagIds: number[];
}
