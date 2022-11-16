import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

export async function EnvioEmail(subject, html){
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADMIN, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password
    },
  });

  const infoEmail = {
    from: "E-commerce Coder-House",
    to: process.env.EMAIL_ADMIN,
    subject: subject,
    html: html
  }

  transporter.sendMail(infoEmail, (error, info)=>{
    if (err) {
        console.log(err)
    } else {
        console.log('Email sent: ' + info.response);
    }
  })
} 

/* szgtdgzipcxkfykt */
