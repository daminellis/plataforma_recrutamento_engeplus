import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, Min } from "class-validator";
import Setor from "src/model/setor.entity";
import Tag from "src/model/tag.entity";
import { Timestamp } from "typeorm";


export class ResponseCountCandidatureDto {

    @ApiProperty()
    @IsInt()
    id: number;

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
    @IsString()
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+ - [A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
    regiao: string;

    @ApiProperty()
    @Type(() => Date)
    dataPostagem: Timestamp;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Setor)
    setor: Setor;
    
    @ApiProperty({ type: [Tag] })
    @IsArray()
    @IsOptional()
    @Type(() => Tag)
    tags: Tag[]

    @ApiProperty()
    @IsArray()
    candidaturaCount: number;
}