import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CandidaturaService } from 'src/service/candidatura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Candidatura from 'src/model/candidatura.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidatura]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: configService.get<boolean>('MAIL_SECURE'),
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
      }),
    }),
  ],
  providers: [EmailService, CandidaturaService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}