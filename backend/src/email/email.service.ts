import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from 'src/dto/emails/SendEmail.dto';
import { CandidaturaService } from 'src/service/candidatura.service';
import Candidatura from 'src/model/candidatura.entity';

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly candidaturaService: CandidaturaService,
    ) { 
    }

    async sendApprovedEmail(sendEmail: SendEmailDto): Promise<void> {
       const candidatos: Candidatura[] = await this.candidaturaService.findAllCandidaturas();

       candidatos.forEach(candidato => {
            if (candidato.email === sendEmail.email) {
                this.mailerService.sendMail({
                    to: candidato.email,
                    from: candidato.email,
                    subject: 'Candidato aprovado, parabéns!',
                    text: `Olá, ${candidato.nomeCompleto}! Como está? Esperamos que bem, pois agora ficará ainda melhor.\n\nNós da Engeplus viemos por meio deste email comemorar sua aprovação em nosso processo seletivo. Está empolgado(a)? Nós também, te esperamos aqui na empresa para finalizarmos seu processo.\n\nCaso queira entrar em contato conosco para tirar alguma dúvida acerca da sua aprovação, como: documentos e/ou quaisquer outros meios de identifiação, estamos à disposição para atendê-lo em:\n- {número de telefone da empresa}\n- {chat do site da empresa caso haja algum}\n\nE também por este email, basta respondê-lo.\n\nDe antemão, lhe informamos que se faz obrigatório apresentar os seguintes intens:\n- {documentos}\n\n-{O que precisar a mais}`,
                    html: `<p>Olá, ${candidato.nomeCompleto}! Como está? Esperamos que bem, pois agora ficará ainda melhor.</p><p>Nós da Engeplus viemos por meio deste email comemorar sua aprovação em nosso processo seletivo 🙂. Está empolgado(a)? Nós também, te esperamos aqui na empresa para finalizarmos seu processo.</p><p>Caso queira entrar em contato conosco para tirar alguma dúvida acerca da sua aprovação, como: documentos e/ou quaisquer outros meios de identificação, estamos à disposição para atendê-lo em:</p><ul><li>{número de telefone da empresa}</li><li>{chat do site da empresa caso haja algum}</li></ul><p>E também por este email, basta respondê-lo.</p><p>De antemão, lhe informamos que se faz obrigatório apresentar os seguintes itens:</p><ul><li>{documentos}</li><li>{O que precisar a mais}</li></ul>`,
                });
            };
        });
    };

    async sendDisapprovedEmail(sendEmail: SendEmailDto): Promise<void> {
        const candidatos: Candidatura[] = await this.candidaturaService.findAllCandidaturas();

        candidatos.forEach(candidato => {
            if (candidato.email === sendEmail.email) {
                this.mailerService.sendMail({
                    to: candidato.email,
                    from: candidato.email,
                    subject: 'Novo talento?',
                    text: `Olá, ${candidato.nomeCompleto}! Tudo bem?\n\nSabemos que você se esforçou bastante no seu processo seletivo aqui na Engeplus. Reconhecemos isso e, por meio deste,\n viemos informar que colocaremos você em nosso banco de talentos para, assim que abrir uma nova vaga, você seja nossa prioridade!.\n Infelizmente precisamos nos despedir por aqui. 🫡`,
                    html: `<p>Olá, ${candidato.nomeCompleto}! Tudo bem?</p><p>Sabemos que você se esforçou bastante no seu processo seletivo aqui na Engeplus. Reconhecemos isso e, por meio deste, viemos informar que colocaremos você em nosso banco de talentos para, assim que abrir uma nova vaga, você seja nossa prioridade!.</p><p>Infelizmente precisamos nos despedir por aqui. 🫡</p>`,
                })
            };
        });
    };
}
