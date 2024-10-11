import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class SendEmailDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Length(8, 50)
    email: string;
}