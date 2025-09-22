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
exports.getGmailMessages = void 0;
const googleapis_1 = require("googleapis");
const google0auth_1 = require("./google0auth"); // your existing oauth2Client
const getGmailMessages = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Set credentials with the stored access token
        google0auth_1.oauth2Client.setCredentials({ access_token: accessToken });
        const gmail = googleapis_1.google.gmail({ version: "v1", auth: google0auth_1.oauth2Client });
        // Fetch the latest 10 messages
        const res = yield gmail.users.messages.list({
            userId: "me",
            maxResults: 10,
        });
        const messages = res.data.messages || [];
        const detailedMessages = [];
        for (const msg of messages) {
            const message = yield gmail.users.messages.get({
                userId: "me",
                id: msg.id,
                format: "full",
            });
            const headers = ((_a = message.data.payload) === null || _a === void 0 ? void 0 : _a.headers) || [];
            const subjectHeader = headers.find(h => h.name === "Subject");
            const fromHeader = headers.find(h => h.name === "From");
            const dateHeader = headers.find(h => h.name === "Date");
            // Get snippet
            const snippet = message.data.snippet || "";
            detailedMessages.push({
                id: msg.id,
                from: (fromHeader === null || fromHeader === void 0 ? void 0 : fromHeader.value) || "",
                subject: (subjectHeader === null || subjectHeader === void 0 ? void 0 : subjectHeader.value) || "",
                date: (dateHeader === null || dateHeader === void 0 ? void 0 : dateHeader.value) || "",
                snippet,
            });
        }
        return detailedMessages;
    }
    catch (error) {
        console.error("Gmail fetch error:", error);
        throw new Error("Failed to fetch emails");
    }
});
exports.getGmailMessages = getGmailMessages;
