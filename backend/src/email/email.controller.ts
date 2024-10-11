import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from 'src/dto/emails/SendEmail.dto';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('/aprovacao')
    sendPositiveEmail(@Body() sendEmail: SendEmailDto): Promise<void> {
        return this.emailService.sendApprovedEmail(sendEmail);
    }

    @Post('/reprovacao')
    sendNegativeEmail(@Body() sendEmail: SendEmailDto): Promise<void> {
        return this.emailService.sendDisapprovedEmail(sendEmail);
    }
}
