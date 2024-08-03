"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptJwt = exports.encryptJwt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Retrieve JWT secret from environment variables
const jwtSecret = process.env.JWT_SECRET || undefined;
/**
 * Encrypts a message using AES encryption with a secret key.
 *
 * @param msg - The message to be encrypted.
 * @param secretKey - The secret key used for encryption.
 * @returns The encrypted message as a ciphertext, or an error message if encryption fails.
 */
const encryptJwt = (msg, secretKey) => {
    // Check if the secret key is provided and valid
    if (secretKey && secretKey == secretKey) {
        // Perform AES encryption on the message using the provided secret key
        return crypto_js_1.default.AES.encrypt(msg, secretKey).toString();
    }
    else
        return "crypto couldn't encrypt!";
};
exports.encryptJwt = encryptJwt;
/**
 * Decrypts a message using AES decryption with a secret key.
 *
 * @param msg - The encrypted message (ciphertext) to be decrypted.
 * @param secretKey - The secret key used for decryption.
 * @returns The decrypted message as plaintext, or an error message if decryption fails.
 */
const decryptJwt = (msg, secretKey) => {
    // Check if both the secret key and JWT secret are provided and valid
    if (secretKey && jwtSecret && secretKey == secretKey) {
        // Perform AES decryption on the message using the provided secret key
        let bytes = crypto_js_1.default.AES.decrypt(msg, secretKey);
        return jsonwebtoken_1.default.verify(bytes.toString(crypto_js_1.default.enc.Utf8), jwtSecret);
    }
    else
        return "crypto couldn't decrypt";
};
exports.decryptJwt = decryptJwt;
//# sourceMappingURL=crypt.utils.js.map