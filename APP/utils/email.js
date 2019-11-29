const nodemailer = require('nodemailer');
const pug = require('pug')

// new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Mayuko Hayashi <${process.env.EMAIL_FROM}>`;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return 1;
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile();

    // 2) define email option
    const mailOptions = {
      from: 'Mayuko Hayashi <mayuko.hayashi.spf.rd@gmail.com>',
      to: options.email,
      subject: options.subject,
      text: options.message
      // html:
    };

    // 3) Create a transport and send email
  }

  sendWelcome() {
    this.send('welcome', 'Welcome to the Natours Family!!');
  }
};

const sendEmail = async options => {
  // 2) Define the email options

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
