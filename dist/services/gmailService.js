"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// src/services/emailService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load .env variables
// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ EMAIL_USER and EMAIL_PASS must be defined in .env");
    process.exit(1);
}
// Create transporter for Ethereal (test emails)
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email", // You can change this to Gmail/other SMTP later
    port: 587,
    secure: false, // use TLS, not SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// Function to send emails
const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: `"Custom Email Tool" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });
        console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`);
        console.log(`Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`); // works with Ethereal
        return info;
    }
    catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
    }
};
exports.sendEmail = sendEmail;
