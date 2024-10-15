import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTagDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    corTag: string;
}