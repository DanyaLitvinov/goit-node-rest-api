const nodemailer = require("nodemailer");
require("dotenv").config();

const { NODEMAILER_PASSWORD, NODEMAILER_USER } = process.env;

const sendEmail = async ({ to, subject, html, text = "" }) => {
  try {
    const email = {
      from: "sender@server.com",
      to,
      subject,
      text,
      html,
    };

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD,
      },
    });

    await transport.sendMail(email);
    
  } catch (error) {
    console.error("Application error", error);
  }
};

module.exports = sendEmail;
