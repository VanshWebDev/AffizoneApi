"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCookie = exports.saveIntoDB = void 0;
const optionObj_1 = require("../../../constant/optionObj/optionObj");
// import PwdVerify from "../../../models/pwdVerify.model";
const pwdVerify_model_1 = require("../../../models/pwdVerify.model");
const saveIntoDB = async (payload) => {
    const user = {
        email: payload.email,
        sub: payload.sub,
        name: payload.name,
        picture: payload.picture,
    };
    const existUser = await pwdVerify_model_1.PwdVerify.findOne({ email: user.email });
    if (existUser) {
        existUser.updateOne(user);
        return;
    }
    await pwdVerify_model_1.PwdVerify.create(user);
    // req.session.payload = user;
};
exports.saveIntoDB = saveIntoDB;
/**
 * Sets an HTTP cookie on the response object.
 *
 * @param {object} res - The response object from an Express.js route handler.
 * @param {string} cookieName - The name of the cookie to set.
 * @param {string} token - The value to set for the cookie.
 */
const createCookie = (res, cookieName, token) => {
    res.cookie(cookieName, token, optionObj_1.createCookieOptions);
};
exports.createCookie = createCookie;
//# sourceMappingURL=signupFunc.js.map