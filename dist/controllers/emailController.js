"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.fetchEmails = void 0;
// 📩 Fetch emails
const fetchEmails = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emails = [
            {
                id: "1",
                from: "test@example.com",
                subject: "Hello",
                snippet: "This is a test email.",
                date: new Date().toISOString(),
            },
            {
                id: "2",
                from: "bot@example.com",
                subject: "Update",
                snippet: "AI-powered workflow update.",
                date: new Date().toISOString(),
            },
        ];
        res.json(emails);
    }
    catch (error) {
        console.error("❌ Error fetching emails:", error);
        res.status(500).json({ message: "Failed to fetch emails" });
    }
});
exports.fetchEmails = fetchEmails;
// 📤 Send email (dummy)
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, subject, text } = req.body;
        if (!to || !subject || !text) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        console.log(`📧 Sending email to: ${to}, Subject: ${subject}, Text: ${text}`);
        res.json({ message: "Email sent successfully (dummy)" });
    }
    catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
});
exports.sendEmail = sendEmail;
