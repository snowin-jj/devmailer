import { createTransport } from "nodemailer";

export class MailService {
  from: string;
  to: string;
  subject: string;
  body: string;

  constructor(from: string, to: string, subject: string, body: string) {
    this.body = body;
    this.to = to;
    this.from = from;
    this.subject = subject;
  }
}

export async function sendMail(mailService: MailService) {
  const transporter = createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_SECRET,
    },
  });

  try {
    return await transporter.sendMail({
      from: `${mailService.from} <${process.env.MAIL_ID}>`,
      to: mailService.to,
      subject: mailService.subject,
      html: mailService.body,
    });
  } catch (error) {
    const e = error as Error;
    throw new Error(e.message);
  }
}
