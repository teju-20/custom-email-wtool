"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const emailApi_1 = require("../api/emailApi");
const SendEmail = () => {
    const [to, setTo] = (0, react_1.useState)("");
    const [subject, setSubject] = (0, react_1.useState)("");
    const [text, setText] = (0, react_1.useState)("");
    const [message, setMessage] = (0, react_1.useState)("");
    const handleSend = async () => {
        try {
            const res = await (0, emailApi_1.sendEmail)(to, subject, text);
            setMessage(res.message);
            setTo("");
            setSubject("");
            setText("");
        }
        catch (err) {
            console.error(err);
            setMessage("Failed to send email");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 20 }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Send Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "To", value: to, onChange: (e) => setTo(e.target.value) }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Subject", value: subject, onChange: (e) => setSubject(e.target.value) }), (0, jsx_runtime_1.jsx)("textarea", { placeholder: "Message", value: text, onChange: (e) => setText(e.target.value) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSend, children: "Send" }), message && (0, jsx_runtime_1.jsx)("p", { children: message })] }));
};
exports.default = SendEmail;
