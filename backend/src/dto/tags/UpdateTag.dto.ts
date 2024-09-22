import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt } from 'class-validator';

export class UpdateTagDto {
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    nome: string;
}