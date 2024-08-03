"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCookieOptions = exports.expressSessionOptions = exports.corsOptions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.corsOptions = {
    credentials: true,
    origin: [
        "https://dorevise.netlify.app",
        "http://localhost:5173",
        "http://192.168.43.139:5173",
        "http://192.168.43.139:5173/",
    ],
    withCredentials: true,
};
exports.expressSessionOptions = {
    secret: process.env.EXPRESS_SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 1000,
    },
};
exports.createCookieOptions = {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    signed: true,
    sameSite: "none",
};
//# sourceMappingURL=optionObj.js.map