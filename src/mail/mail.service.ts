import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  async sendMail(to: string, subject: string, text: string) {
    const sendSmtpEmail = {
      to: [{ email: to }],
      sender: { email: process.env.SENDER_EMAIL },
      subject: subject,
      textContent: text,
    };

    const Config = {
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        sendSmtpEmail,
        Config,
      );
      console.log(response, 'Mail sent successfully');
    } catch (error) {
      console.error(error, 'Error sending mail');
    }
  }
}
