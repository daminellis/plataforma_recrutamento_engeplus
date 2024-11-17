import { IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTagDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(50)
    nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(7)
    corTag: string;
}