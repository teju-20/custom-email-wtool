"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (to, subject, text) => {
    try {
        // Configure transporter with your Gmail or SMTP credentials
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // your Gmail address
                pass: process.env.EMAIL_PASS, // app password, not your real Gmail password
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
        return { message: "Email sent successfully" };
    }
    catch (error) {
        console.error("❌ Error sending email:", error);
        return { message: "Failed to send email" };
    }
};
exports.sendEmail = sendEmail;
