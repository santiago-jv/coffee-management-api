import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { TemplateType } from './constants/template-type.enum';
import { ConfigService } from '@nestjs/config';
import { DefaultValues } from 'src/common/constants';
import {
  EmailSenderConstants,
} from './constants/email-sender.constants';

@Injectable()
export class EmailSenderService {
  private MAIL_USER: string;
  private transporter: Transporter;
  constructor(configService: ConfigService) {
    const MAIL_HOST = configService.get<string>('MAIL_HOST');
    const MAIL_PORT = configService.get<number>('MAIL_PORT');
    this.MAIL_USER = configService.get<string>('MAIL_USER');
    const MAIL_PASSWORD = configService.get<string>('MAIL_PASSWORD');

    this.transporter = createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      auth: {
        user: this.MAIL_USER,
        pass: MAIL_PASSWORD,
      },
      secure: true,
    });
  }

  async sendResetPasswordEmail(email: string, code: string) {
    try {
      const html = this.generateHtmlTemplate(TemplateType.RESET_PASSWORD, {
        code: code,
      });
      await this.transporter.sendMail({
        from: `${EmailSenderConstants.SENDER_NAME} <${this.MAIL_USER}>`,
        to: email,
        subject: EmailSenderConstants.SUBJECT_TYPE.RESET_PASSWORD,
        html,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  private generateHtmlTemplate(templateType: TemplateType, params: Object) {
    const template = fs.readFileSync(
      path.join(
        __dirname,
        DefaultValues.DOUBLE_DOTS_STRING,
        DefaultValues.DOUBLE_DOTS_STRING,
        templateType,
      ),
      DefaultValues.UTF_8_VALUE,
    );

    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate(params);
  }
}
