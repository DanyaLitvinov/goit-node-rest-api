const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_API_PASSWORD, EMAIL_API_USER } = process.env;

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
        user: EMAIL_API_USER,
        pass: EMAIL_API_PASSWORD,
      },
    });

    await transport.sendMail(email);
    
  } catch (error) {
    console.error("Application error", error);
  }
};

module.exports = sendEmail;

// transport
//   .sendMail(email)
//   .then(() => {
//     console.log("Email sent success");
//   })
//   .catch((e) => {
//     console.log(e.message);
//   });
