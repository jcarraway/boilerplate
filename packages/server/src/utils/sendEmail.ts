// import * as nodemailer from 'nodemailer';
import * as sendgrid from '@sendgrid/mail';
import { MailData } from '@sendgrid/helpers/classes/mail';

export const sendEmail = async (
  recipient: string,
  url: string,
  linkText: string
) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

  // Message object
  const message: MailData[] = [
    {
      from: 'Example <sender@hwyd.com>',
      to: `Recipient <${recipient}>`,
      subject: 'Example email subject ✔',
      text: 'Example',
      html: `
          <html>
            <body>
              <a href=${url}>${linkText}</a>
            </body>
          </html>
        `,
    },
  ];

  try {
    await sendgrid.send(message);
  } catch (error) {
    console.log('sendgrid error:', error);
  }
};
