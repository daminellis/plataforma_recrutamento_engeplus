import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateSetorDto {
    @IsOptional()
    @IsInt()
    id: number;
    
    @IsOptional()
    @IsString()
    nome: string;
}