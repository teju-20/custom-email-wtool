"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SendEmail_1 = __importDefault(require("./components/SendEmail"));
const EmailList_1 = __importDefault(require("./components/EmailList"));
const App = () => {
    const [emails, setEmails] = (0, react_1.useState)([]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: 20 }, children: [(0, jsx_runtime_1.jsx)("h1", { children: "Email Workflow Tool" }), (0, jsx_runtime_1.jsx)(SendEmail_1.default, { setEmails: setEmails }), (0, jsx_runtime_1.jsx)(EmailList_1.default, { emails: emails })] }));
};
exports.default = App;
