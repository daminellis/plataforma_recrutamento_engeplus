import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSetorDto {
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(50)
    nome?: string;
}