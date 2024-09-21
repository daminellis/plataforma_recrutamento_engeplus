import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSetorDto {
    @IsNotEmpty()
    @IsString()
    nome: string;
}