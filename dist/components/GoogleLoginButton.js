"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_google_login_1 = require("react-google-login");
const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
    return ((0, jsx_runtime_1.jsx)(react_google_login_1.GoogleLogin, { clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || "", buttonText: "Login with Google", onSuccess: onLoginSuccess, onFailure: onLoginFailure, cookiePolicy: "single_host_origin", isSignedIn: true }));
};
exports.default = GoogleLoginButton;
