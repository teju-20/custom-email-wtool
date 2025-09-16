// src/services/emailService.ts
import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL_USER and EMAIL_PASS must be defined in .env");
  process.exit(1);
}

// Create transporter for Ethereal (test emails)
const transporter: Transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", // You can change this to Gmail/other SMTP later
  port: 587,
  secure: false, // use TLS, not SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send emails
export const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<nodemailer.SentMessageInfo> => {
  try {
    const info = await transporter.sendMail({
      from: `"Custom Email Tool" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`); // works with Ethereal

    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
