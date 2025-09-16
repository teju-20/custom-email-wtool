"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/emailRoutes.ts
const express_1 = require("express");
const gmailService_1 = require("../services/gmailService");
const router = (0, express_1.Router)();
// In-memory email storage
let emails = [
    { id: 1, subject: "Hello", body: "This is a test email", to: "test@example.com" },
];
// POST /emails - Add email and send it
router.post("/", async (req, res) => {
    const { subject, body, to } = req.body;
    if (!subject || !body || !to) {
        return res.status(400).json({ message: "To, subject, and body are required" });
    }
    const newEmail = { id: Date.now(), subject, body, to };
    emails.push(newEmail);
    try {
        // Send the email
        await (0, gmailService_1.sendEmail)(to, subject, body);
        res.status(201).json({ message: "Email sent successfully", email: newEmail });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to send email", error });
    }
});
// GET /emails - Retrieve all emails
router.get("/", (_req, res) => {
    res.status(200).json(emails);
});
exports.default = router;
