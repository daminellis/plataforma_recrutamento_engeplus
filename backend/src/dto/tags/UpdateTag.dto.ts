import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt } from 'class-validator';

export class UpdateTagDto {
    @IsNotEmpty()
    @IsOptional()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    nome: string;
}