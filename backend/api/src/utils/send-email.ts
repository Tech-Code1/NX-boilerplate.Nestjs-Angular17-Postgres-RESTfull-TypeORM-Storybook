import { User } from '@db/entities';
import { NODEMAILER_USER, PASS_GMAIL } from '@environments';
import * as nodemailer from 'nodemailer';
import { ErrorManager } from './response.manager';

export const sendEmail = async (
  emailOptions: {
    subject: string;
    htmlBody: string;
    to: string;
  },
  user: User,
  smtpConfig?: any
): Promise<void> => {
  const config = smtpConfig || {
    service: 'gmail',
    auth: {
      user: NODEMAILER_USER,
      pass: PASS_GMAIL,
    },
  };

  const { htmlBody, subject, to } = emailOptions;

  const mailOptions = {
    from: NODEMAILER_USER,
    to,
    subject,
    html: htmlBody,
  };

  const transporter = nodemailer.createTransport(config);
  await transporter.sendMail(mailOptions, (err) => {
    if (err) {
      throw ErrorManager.createError(
        'The email could not be sent, something unexpected happened',
        'BAD_REQUEST'
      );
    } else {
      console.log(`Email sent to: ${user.email}`);
    }
  });
};
