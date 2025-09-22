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
exports.handleGoogleCallback = exports.login = void 0;
const google0auth_1 = require("../utils/google0auth");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleapis_1 = require("googleapis");
const login = (req, res) => {
    res.json({ message: 'Login successful' });
};
exports.login = login;
const handleGoogleCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const code = req.query.code;
    if (!code) {
        res.status(400).json({ message: 'Code not provided' });
        return;
    }
    try {
        // Get tokens from Google
        const { tokens } = yield google0auth_1.oauth2Client.getToken(code);
        google0auth_1.oauth2Client.setCredentials(tokens);
        // Get user info
        const oauth2 = googleapis_1.google.oauth2({ auth: google0auth_1.oauth2Client, version: 'v2' });
        const { data } = yield oauth2.userinfo.get();
        if (!data.email) {
            res.status(400).json({ message: 'Email not found in Google profile' });
            return;
        }
        // Find or create user
        let user = yield user_1.default.findOne({ email: data.email });
        const expiryDate = tokens.expiry_date ? new Date(tokens.expiry_date) : new Date(Date.now() + 3600 * 1000);
        if (!user) {
            user = new user_1.default({
                email: data.email,
                accessToken: (_a = tokens.access_token) !== null && _a !== void 0 ? _a : '',
                refreshToken: (_b = tokens.refresh_token) !== null && _b !== void 0 ? _b : '',
                tokenExpiry: expiryDate,
            });
        }
        else {
            user.accessToken = (_c = tokens.access_token) !== null && _c !== void 0 ? _c : user.accessToken;
            user.refreshToken = (_d = tokens.refresh_token) !== null && _d !== void 0 ? _d : user.refreshToken;
            user.tokenExpiry = expiryDate;
        }
        yield user.save();
        // Generate JWT token
        const jwtToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ accessToken: jwtToken, user: { id: user.id, email: user.email } });
    }
    catch (error) {
        console.error('OAuth callback error:', error);
        res.status(500).json({ message: 'OAuth callback error', error });
    }
});
exports.handleGoogleCallback = handleGoogleCallback;
