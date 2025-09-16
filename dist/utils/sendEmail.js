"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// src/components/SendEmail.tsx
const react_1 = require("react");
const emailApi_1 = require("../api/emailApi");
const SendEmail = ({ setEmails }) => {
    const [to, setTo] = (0, react_1.useState)("");
    const [subject, setSubject] = (0, react_1.useState)("");
    const [text, setText] = (0, react_1.useState)("");
    const [status, setStatus] = (0, react_1.useState)("");
    const handleSend = async () => {
        try {
            const response = await (0, emailApi_1.sendEmail)(to, subject, text);
            setStatus(response.message || "Email sent successfully");
            // Optionally refresh email list here
            setEmails(prev => [...prev, { to, subject, text }]);
            setTo("");
            setSubject("");
            setText("");
        }
        catch (error) {
            console.error("Send email error:", error);
            setStatus("Error sending email");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 20, display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }, children: [(0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "To", value: to, onChange: e => setTo(e.target.value) }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Subject", value: subject, onChange: e => setSubject(e.target.value) }), (0, jsx_runtime_1.jsx)("textarea", { placeholder: "Message", value: text, onChange: e => setText(e.target.value), rows: 4 }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSend, children: "Send" }), status && (0, jsx_runtime_1.jsx)("div", { children: status })] }));
};
exports.default = SendEmail;
