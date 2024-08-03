"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.checkIfMail = exports.sendRes = void 0;
const { OurErr } = require("../../utils/error/errorClass");
const { ifPasswordNotMatch } = require("../authController/login/errObj");
const sendRes = (res, resObj) => {
    const { statusCode, jsonObj } = resObj;
    res.status(statusCode).json(jsonObj);
};
exports.sendRes = sendRes;
/**
 * Checks if a given string is a valid Gmail address.
 * @param {string} emailOrUsername - The string to be checked, which can be either an email or a username.
 * @returns {boolean} Returns `true` if the string is a valid Gmail address, otherwise `false`.
 */
const checkIfMail = (emailOrUsername) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);
    const endsWithGmail = emailOrUsername.endsWith("@gmail.com");
    const endsWithEmail = emailOrUsername.endsWith("@email.com");
    return isEmail && (endsWithGmail || endsWithEmail);
};
exports.checkIfMail = checkIfMail;
/**
 *  Description: Validates if the provided password matches the confirmed password.
 * @function checkPassword
 * @param {string} password - The original password entered by the user.
 * @param {string} confirmPassword - The confirmation of the password to be checked against.
 */
const checkPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new OurErr(ifPasswordNotMatch);
    }
    if (password === confirmPassword)
        return true;
};
exports.checkPassword = checkPassword;
//# sourceMappingURL=reuableFunc.js.map