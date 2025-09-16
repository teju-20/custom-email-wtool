"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const axios_1 = __importDefault(require("axios"));
const sendEmail = async (to, subject, text) => {
    const response = await axios_1.default.post("http://localhost:5000/api/send-email", { to, subject, text });
    return response.data;
};
exports.sendEmail = sendEmail;
