"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// .env variables
const jwtSecret = process.env.JWT_SECRET;
const cryptoSecret = process.env.CRYPTO_SECRET;
/**
 * Generates a JWT token for the given email, signs it with a secret key,
 * encrypts the token, and returns the encrypted token.
 *
 * @param email - The email for which the JWT token is generated. This parameter is required.
 * @returns The encrypted JWT token as a string, or undefined if the JWT secret or crypto secret is not set.
 */
const generateJwtToken = (email) => {
    if (!jwtSecret || !cryptoSecret)
        return undefined;
    // Payload for the JWT
    const payload = { email };
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: 24 * 60 * 60 }); // expiresIn is in seconds (24 hours)
    // Encrypt the JWT token
    const encryptedJwtToken = crypto_js_1.default.AES.encrypt(token, cryptoSecret).toString();
    return encryptedJwtToken;
};
exports.generateJwtToken = generateJwtToken;
//# sourceMappingURL=jwt.utils.js.map