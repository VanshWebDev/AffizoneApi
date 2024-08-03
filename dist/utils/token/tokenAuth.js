"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAuth = void 0;
const { createCookie, saveIntoDB, } = require("../../helpers/authController/signup/signupFunc");
const { generateJwtToken } = require("./jwt.utils");
const tokenAuth = async (req, res, payload, otherInfo) => {
    const { cookieName, statusCode, message, isNewUser } = otherInfo;
    const email = typeof payload === "string" ? payload : payload.email;
    const token = generateJwtToken(email); //check in payload?.email condition
    createCookie(res, cookieName, token);
    if (isNewUser)
        await saveIntoDB(payload);
    res.status(statusCode).json({ message: message, newUser: isNewUser });
};
exports.tokenAuth = tokenAuth;
//# sourceMappingURL=tokenAuth.js.map