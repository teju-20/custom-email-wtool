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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEmails = void 0;
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// OAuth2 client setup using your .env variables
const oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, process.env.OAUTH_REDIRECT_URI);
// Set your refresh token
oAuth2Client.setCredentials({
    refresh_token: process.env.EMAIL_PASS // Or if you have a separate refresh token, use it here
});
// Gmail API instance
const gmail = googleapis_1.google.gmail({ version: "v1", auth: oAuth2Client });
const fetchEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield gmail.users.messages.list({
            userId: "me",
            maxResults: 10, // fetch latest 10 emails
            labelIds: ["INBOX"],
        });
        const messages = res.data.messages || [];
        const emailDetails = yield Promise.all(messages.map((msg) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            const email = yield gmail.users.messages.get({
                userId: "me",
                id: msg.id,
            });
            const headers = ((_a = email.data.payload) === null || _a === void 0 ? void 0 : _a.headers) || [];
            const from = ((_b = headers.find((h) => h.name === "From")) === null || _b === void 0 ? void 0 : _b.value) || "";
            const subject = ((_c = headers.find((h) => h.name === "Subject")) === null || _c === void 0 ? void 0 : _c.value) || "";
            const snippet = email.data.snippet || "";
            return {
                id: msg.id,
                from,
                subject,
                snippet,
            };
        })));
        return emailDetails;
    }
    catch (error) {
        console.error("Gmail fetch error:", error);
        throw error;
    }
});
exports.fetchEmails = fetchEmails;
