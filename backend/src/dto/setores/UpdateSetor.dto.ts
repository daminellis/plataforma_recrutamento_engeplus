import { IsOptional, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSetorDto {
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    nome: string;
}