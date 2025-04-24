import nodemailer from 'nodemailer';

// Email configuration
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'qrgospel@gmail.com',
    pass: 'msnd mpet gplg wgrb',
  },
});