import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateSetorDto {
    @IsOptional()
    @IsString()
    nome: string;
}