import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from 'src/dto/emails/SendEmail.dto';

@Injectable()
export class EmailService {
    private phoneNumber = {
        phoneNumberCriciuma: '(48) 3431-4700',
        phoneNumberTubarao: ' (48) 3631-4700',
    };
    private talkToUs = 'https://www.engeplusempresas.com.br/fale-conosco';
    private docs = {
        documents: 'RG, CPF ou CNH',
        workCard: 'Carteira de Trabalho digital ou física',
    };
    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async sendApprovedEmail(sendEmail: SendEmailDto): Promise<void> {
      
            await this.mailerService.sendMail({
                to: sendEmail.email,
                from: 'no-reply@engeplus.com',
                subject: 'Candidato aprovado, parabéns!',
                text: this.getApprovedEmailText(sendEmail.nomeCompleto),
                html: this.getApprovedEmailHtml(sendEmail.nomeCompleto),
            });
    }

    private getApprovedEmailText(nomeCompleto: string): string {
        return `Olá, ${nomeCompleto}! Como está? Esperamos que bem, pois agora ficará ainda melhor.

        Nós da Engeplus viemos por meio deste email comemorar sua aprovação em nosso processo seletivo 🙂. Está empolgado(a)? Nós também, te esperamos aqui na empresa para finalizarmos seu processo.

        Caso queira entrar em contato conosco para tirar alguma dúvida acerca da sua aprovação, como: documentos e/ou quaisquer outros meios de identificação, estamos à disposição para atendê-lo em:
        - Criciúma: ${this.phoneNumber.phoneNumberCriciuma}
        - Tubarão: ${this.phoneNumber.phoneNumberTubarao}
        - Fale conosco: ${this.talkToUs}

        E também por este email, basta respondê-lo.

        De antemão, lhe informamos que se faz obrigatório apresentar os seguintes itens:
        - Identificação: ${this.docs.documents}
        - ${this.docs.workCard}
        
        Atenciosamente,\n
        Equipe Engeplus
        `;

    }

    private getApprovedEmailHtml(nomeCompleto: string): string {
        return `<p>Olá, ${nomeCompleto}! Como está? Esperamos que bem, pois agora ficará ainda melhor.
        
        </p><p>Nós da Engeplus viemos por meio deste email comemorar sua aprovação em nosso processo seletivo 🙂. Está empolgado(a)? Nós também, te esperamos aqui na empresa para finalizarmos seu processo.
        </p><p>Caso queira entrar em contato conosco para tirar alguma dúvida acerca da sua aprovação, como: documentos e/ou quaisquer outros meios de identificação, estamos à disposição para atendê-lo em:
        
        </p>
        <ul>
            <li>Criciúma: ${this.phoneNumber.phoneNumberCriciuma}</li>
            <li>Tubarão: ${this.phoneNumber.phoneNumberTubarao}</li>
            <li>Fale conosco: <a href=${this.talkToUs}>Engeplus<a></li>
        </ul>
        <p>E também por este email, basta respondê-lo.
        
        </p><p>De antemão, lhe informamos que se faz obrigatório apresentar os seguintes itens:
        </p>
        <ul>
            <li>Identificação: ${this.docs.documents}</li>
            <li>${this.docs.workCard}</li>
        </ul>
        
        <p>
        Atenciosamente, <br>
        Equipe Engeplus
        </p>
        `;
    }

    async sendDisapprovedEmail(sendEmail: SendEmailDto): Promise<void> {
       
             await this.mailerService.sendMail({
                to: sendEmail.email,
                from: sendEmail.email,
                subject: 'Novo talento?',
                text: this.getDisapprovedEmailText(sendEmail.nomeCompleto),
                html: this.getDisapprovedEmailHtml(sendEmail.nomeCompleto),
            })
    };

    private getDisapprovedEmailText(nomeCompleto: string): string {
        return `Olá, ${nomeCompleto}! Tudo bem?\n\nSabemos que você se esforçou bastante no seu processo seletivo aqui na Engeplus. 
        Reconhecemos isso e, por meio deste,\n viemos informar que colocaremos você em nosso banco de talentos para, assim que abrir uma nova vaga, você seja nossa prioridade!\n 
        Temporariamente precisamos nos despedir por aqui. 🫡\n
        
        Atencionamente,\n
        Equipe Engeplus
        `;
    }

    private getDisapprovedEmailHtml(nomeCompleto: string): string {
        return `<p>Olá, ${nomeCompleto}! Tudo bem?</p><p>Sabemos que você se esforçou bastante no seu processo seletivo aqui na Engeplus. 
        Reconhecemos isso e, por meio deste, viemos informar que colocaremos você em nosso banco de talentos para, assim que abrir uma nova vaga, você seja nossa prioridade!</p>
        <p>Temporariamente precisamos nos despedir por aqui. 🫡</p>
        
        <p>
        Atenciosamente, <br>
        Equipe Engeplus
        </p>
        `;
    }
}
