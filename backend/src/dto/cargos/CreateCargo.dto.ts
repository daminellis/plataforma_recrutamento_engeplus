import { IsNotEmpty, IsString } from "class-validator";

export class CreateCargoDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    descricao: string;
}