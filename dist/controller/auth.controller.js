"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ram = exports.logout = exports.verifyOtp = exports.forgetpassword = exports.checkUsernameAvailablity = exports.createpassword = exports.checkToken = exports.login = exports.signup = void 0;
//////////////////////////////////////////
require("dotenv").config();
// ------------- Third party packages -------------------
const bcrypt_1 = __importDefault(require("bcrypt"));
const google_auth_library_1 = require("google-auth-library");
// ---------------- Local files --------------------------
// ---------------- Local files --------------------------
const crypt_utils_1 = require("../utils/token/crypt.utils");
const tokenAuth_1 = require("../utils/token/tokenAuth");
const errorClass_1 = require("../utils/error/errorClass");
// ---------------- Response objects ----------------------
const resObj_1 = require("../helpers/authController/checkUsernameAvailablity/resObj/resObj");
const resObj_2 = require("../helpers/authController/signup/resObj");
const resObj_3 = require("../helpers/authController/login/resObj");
const resObj_4 = require("../helpers/authController/verifyotp/resObj");
// ---------------- Error objects ---------------------------
const errObj_1 = require("../helpers/authController/checktoken/errObj");
const errObj_2 = require("../helpers/authController/login/errObj");
const errObj_3 = require("../helpers/authController/createpassword/errObj");
const errObj_4 = require("../helpers/authController/forgetpwd/errObj");
const errObj_5 = require("../helpers/authController/signup/errObj");
// ---------------- Helpers functions --------------------------
const createpasswordFunc_1 = require("../helpers/authController/createpassword/createpasswordFunc");
const reuableFunc_1 = require("../helpers/reusable/reuableFunc");
const forgetpwdFunc_1 = require("../helpers/authController/forgetpwd/forgetpwdFunc");
const verifyoptFunc_1 = require("../helpers/authController/verifyotp/verifyoptFunc");
const checkUsernameAvailablity_1 = require("../helpers/authController/checkUsernameAvailablity/checkUsernameAvailablity");
const checktokenFunc_1 = require("../helpers/authController/checktoken/checktokenFunc");
// ---------------- Mongoose models -----------------------
const otp_model_1 = require("../models/otp.model");
const user_model_1 = require("../models/user.model");
// ---------------- .env variables --------------------------
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new google_auth_library_1.OAuth2Client(CLIENT_ID);
const cryptoSecret = process.env.CRYPTO_SECRET || "";
////////////////////////////////////////////////
const signup = async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload?.email)
        throw new errorClass_1.OurErr(errObj_5.ifPayloadNot);
    const checkUser = await user_model_1.User.findOne({ email: payload.email });
    if (checkUser)
        (0, tokenAuth_1.tokenAuth)(req, res, checkUser.email, resObj_2.resIfUserExist);
    else
        (0, tokenAuth_1.tokenAuth)(req, res, payload.email, resObj_2.resIfUserNotExist);
};
exports.signup = signup;
const login = async (req, res) => {
    const { emailOrUsername, password } = req.body;
    let checkuser;
    if ((0, reuableFunc_1.checkIfMail)(emailOrUsername)) {
        checkuser = await user_model_1.User.findOne({ email: emailOrUsername }).select("+password");
    }
    else {
        checkuser = await user_model_1.User.findOne({ username: emailOrUsername }).select("+password");
    }
    if (!checkuser || !checkuser?.password) {
        throw new errorClass_1.OurErr(errObj_2.loginErr);
    }
    else {
        const isMatch = await bcrypt_1.default.compare(password, checkuser.password);
        if (isMatch) {
            (0, tokenAuth_1.tokenAuth)(req, res, emailOrUsername, resObj_3.resIfPasswordMatch);
        }
        else {
            throw new errorClass_1.OurErr(errObj_2.loginErr1);
        }
    }
};
exports.login = login;
const checkToken = async (req, res) => {
    const token = req.signedCookies.token;
    if (!token) {
        throw new errorClass_1.OurErr(errObj_1.checkTokenErr); //Error if token not found in frontend.
    }
    else {
        const payload = (0, crypt_utils_1.decryptJwt)(token, cryptoSecret);
        const { email } = payload;
        let user;
        if ((0, reuableFunc_1.checkIfMail)(payload.email))
            user = await (0, checktokenFunc_1.getUserIfEamil)(email);
        //
        else
            user = await (0, checktokenFunc_1.getUserIfUsername)(email);
        if (!user)
            throw new errorClass_1.OurErr(errObj_1.checkTokenIfUserNot);
        //
        else
            (0, reuableFunc_1.sendRes)(res, (0, checktokenFunc_1.resIfUserObj)(user));
    }
};
exports.checkToken = checkToken;
const createpassword = async (req, res) => {
    const { password, confirmPassword, username } = req.body;
    const { token } = req.signedCookies;
    const usernameRes = await (0, createpasswordFunc_1.checkUsername)(username);
    let passwordRes;
    if (usernameRes)
        passwordRes = (0, reuableFunc_1.checkPassword)(password, confirmPassword);
    let payloadRes, clientPayload;
    if (passwordRes) {
        clientPayload = (0, crypt_utils_1.decryptJwt)(token, cryptoSecret);
        payloadRes = await (0, createpasswordFunc_1.checkUserPayload)(clientPayload);
    }
    if (payloadRes) {
        if (!clientPayload)
            throw new errorClass_1.OurErr(errObj_3.ifClientPayloadNot);
        await (0, createpasswordFunc_1.saveUser)(res, password, username, clientPayload);
    }
    else
        throw new errorClass_1.OurErr(errObj_3.createPasswordErr);
};
exports.createpassword = createpassword;
const checkUsernameAvailablity = async (req, res) => {
    const { usr } = req.query;
    if (usr) {
        const checkUsernameRes = await (0, checkUsernameAvailablity_1.checkIfUserExist)(usr);
        if (checkUsernameRes)
            (0, reuableFunc_1.sendRes)(res, resObj_1.ifUsernameNotAvilable);
        else
            (0, reuableFunc_1.sendRes)(res, resObj_1.ifUsernameAvilable);
    }
};
exports.checkUsernameAvailablity = checkUsernameAvailablity;
// Password reset handler
const forgetpassword = async (req, res) => {
    const { emailOrUsername } = req.body;
    let isEmail = (0, reuableFunc_1.checkIfMail)(emailOrUsername);
    let userEmail;
    if (isEmail)
        userEmail = await user_model_1.User.findOne({ email: emailOrUsername }).select("email");
    else
        throw new errorClass_1.OurErr(errObj_4.forgetpwdIfUsername);
    // throw err if user not exist in DB
    if (!userEmail)
        throw new errorClass_1.OurErr(errObj_4.forgetpwdIfUserNot);
    const otp = (0, forgetpwdFunc_1.generateOtp)();
    await otp_model_1.OTP.create({ email: userEmail.email, otp: otp }).catch((err) => {
        if (err.code === 11000) {
            throw new errorClass_1.OurErr(errObj_4.forgetpwdIfDuplicatekay);
        }
    });
    await (0, forgetpwdFunc_1.sendEmail)(res, userEmail.email, otp);
};
exports.forgetpassword = forgetpassword;
const verifyOtp = async (req, res) => {
    const { otp, newPassword, confirmPassword, userEmail } = req.body;
    await (0, verifyoptFunc_1.chkOtp)(otp, userEmail);
    const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
    await user_model_1.User.updateOne({ email: userEmail }, { password: hashedPassword });
    await otp_model_1.OTP.deleteOne({ email: userEmail });
    (0, reuableFunc_1.sendRes)(res, resObj_4.verifyotpIfPwdSuccessfullyReset);
};
exports.verifyOtp = verifyOtp;
const logout = async (req, res) => {
    res.clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: true, // Use secure: true if serving over HTTPS
        sameSite: "none", // Specify SameSite attribute as None
    });
    // Add any other logout logic here
    res.status(200).send({ message: "Logout successfully" });
};
exports.logout = logout;
const Ram = async (req, res) => {
    res.send("Jai Shri Ram 🍀");
};
exports.Ram = Ram;
//# sourceMappingURL=auth.controller.js.map