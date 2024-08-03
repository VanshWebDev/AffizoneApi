"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = exports.checkUserPayload = exports.checkUsername = void 0;
const { OurErr } = require("../../../utils/error/errorClass");
const User = require("../../../models/user.model");
const bcrypt = require("bcrypt");
const { sendRes } = require("../../reusable/reuableFunc");
const { ifUsernameUndefined, ifUsernameNotValid, ifLengthNotValid, ifUsernameExist, } = require("./errObj");
const { createPasswordRes } = require("./resObj");
const PwdVerify = require("../../../models/pwdVerify.model");
/**
 * Validates the given username for format, length, and uniqueness.
 * @param {string} username - The username to be validated.
 * @returns {Promise<boolean>} Returns a promise that resolves to true if all validations pass.
 */
const checkUsername = async (username) => {
    // Validate username format
    if (!username) {
        throw new OurErr(ifUsernameUndefined);
    }
    // Only allow letters, numbers, and underscores
    if (!/^[a-z0-9_]+$/.test(username)) {
        throw new OurErr(ifUsernameNotValid);
    }
    // Validate username length
    if (username.length < 2 || username.length > 30) {
        throw new OurErr(ifLengthNotValid);
    }
    // Check for username uniqueness in the database
    const existingUser = await User.findOne({ username });
    if (existingUser)
        throw new OurErr(ifUsernameExist);
    // All validations passed; return true
    return true;
};
exports.checkUsername = checkUsername;
/**
 * Check if the client's payload matches the server's session payload.
 *
 * This function compares the client's payload, specifically the email, with the server's session-stored email payload.
 * It is typically used to verify that the user data sent from the client side matches the authenticated session data stored on the server.
 *
 * @param {Object} clientPayload - The payload data sent by the client. It should have an `email` property.
 * @param {Object} req - The request object from the server. This contains the session data where the server's payload is stored.
 * @returns {boolean} Returns `true` if the client's email matches the server's session email, otherwise returns `false`.
 */
const checkUserPayload = async (clientPayload) => {
    // Get the server's payload from the session
    const serverPayload = await PwdVerify.findOne({
        email: clientPayload?.email,
    }).select("email");
    // Compare the client's email with the server's email in the session
    if ((clientPayload && clientPayload?.email) === serverPayload?.email)
        return true;
    else
        return false;
};
exports.checkUserPayload = checkUserPayload;
/**
 * Saves a new user with a hashed password and a given username to the database.
 *
 * This function takes the user's data stored in the session, hashes the provided password, and creates a new user entry in the database.
 * After successfully creating the user, it sends a predefined response back to the client.
 *
 * @param {Object} req - The HTTP request object, which includes the session payload containing the user's data.
 * @param {Object} res - The HTTP response object used to send the response back to the client.
 * @param {string} password - The plaintext password provided by the user, which will be hashed before saving.
 * @param {string} username - The username chosen by the user.
 * @returns {Promise<boolean>} Returns `true` if the user is successfully saved and the response is sent.
 */
const saveUser = async (res, password, username, clientPayload) => {
    const { email } = clientPayload;
    const user = await PwdVerify.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    const userToCreate = {
        email: user.email,
        sub: user.sub,
        name: user.name,
        picture: user.picture,
        password: hashedPassword,
        username,
    };
    await User.create(userToCreate);
    sendRes(res, createPasswordRes);
    return true;
};
exports.saveUser = saveUser;
//# sourceMappingURL=createpasswordFunc.js.map