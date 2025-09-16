"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.EMAIL_PASS = exports.EMAIL_USER = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/email-workflow";
exports.EMAIL_USER = process.env.EMAIL_USER || "";
exports.EMAIL_PASS = process.env.EMAIL_PASS || "";
exports.PORT = process.env.PORT || 5000;
