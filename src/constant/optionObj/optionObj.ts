import dotenv from "dotenv";
import { CookieOptions } from "express";
dotenv.config();

export const corsOptions = {
  credentials: true,
  origin: [
     process.env.FRONTEND_URL,
     "https://affizone.netlify.app/",
    "https://dorevise.netlify.app",
    "http://localhost:5173",
    "http://192.168.43.139:5173",
    "http://192.168.43.139:5173/",
  ],
  withCredentials: true,
};

export const expressSessionOptions = {
  secret: process.env.EXPRESS_SESSION_SECRET || "",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 1000,
  },
};

export const createCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  signed: true,
  sameSite: "none",
};
