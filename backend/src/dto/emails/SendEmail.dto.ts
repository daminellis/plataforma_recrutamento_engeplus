import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SendEmailDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Length(8, 50)
    email: string;
}