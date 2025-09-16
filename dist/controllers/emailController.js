"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;
    if (!to || !subject || !text) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Configure your SMTP transporter
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // your Gmail
                pass: process.env.EMAIL_PASS, // app password
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email", error });
    }
};
exports.sendEmail = sendEmail;
