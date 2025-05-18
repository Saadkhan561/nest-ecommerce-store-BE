import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendOtpMail(to: string, subject: string, otp: string) {
    const mailOptions = {
      to: to,
      from: 'The Perfumes',
      subject: subject,
      html: `
        <h3>Forgot Password Request</h3>
        <p>Your OTP is:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 1 hour. Do not share it with anyone.</p>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
