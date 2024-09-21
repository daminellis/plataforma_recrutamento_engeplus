import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateVagaTagDto {
    @IsNotEmpty()
    @IsInt()
    vagaId: number;

    @IsNotEmpty()
    @IsInt()
    tagId: number;
}