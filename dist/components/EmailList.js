"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const EmailList = ({ emails }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Sent Emails" }), (0, jsx_runtime_1.jsx)("ul", { children: emails.map((email, idx) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("b", { children: "To:" }), " ", email.to, ", ", (0, jsx_runtime_1.jsx)("b", { children: "Subject:" }), " ", email.subject, ", ", (0, jsx_runtime_1.jsx)("b", { children: "Message:" }), " ", email.text] }, idx))) })] }));
};
exports.default = EmailList;
