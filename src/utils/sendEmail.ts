import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,  // use STARTTLS on port 587
  auth: {
    user: process.env.EMAIL_USER,    // Your Gmail address
    pass: process.env.EMAIL_PASS,    // Your Gmail App Password
  },
});

// Function to send email
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const mailOptions = {
      from: `"Project Workflow" <${process.env.EMAIL_USER}>`,  // sender address
      to,
      subject,
      text,
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);
    return info;

  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
