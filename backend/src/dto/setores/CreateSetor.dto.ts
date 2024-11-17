import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSetorDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    nome: string;
}