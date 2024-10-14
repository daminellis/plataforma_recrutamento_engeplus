import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTagDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    nome: string;
}