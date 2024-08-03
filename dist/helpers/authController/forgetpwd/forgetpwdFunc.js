"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.generateOtp = void 0;
const nodemailer = require("nodemailer");
const { sendRes } = require("../../reusable/reuableFunc");
const { resIfEmailSent, resIfEmailNotSent } = require("./resObj");
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
    return otp;
};
exports.generateOtp = generateOtp;
const sendEmail = async (res, email, otp) => {
    // Create a transporter object with SMTP settings
    let transporter = nodemailer.createTransport({
        service: "Gmail", // Example: Gmail, you can use any email service provider
        auth: {
            user: "vanshvanshkumar39@gmail.com", // Your email
            pass: "qudr vvki akbb mrma", // Your email password
        },
    });
    // Define the email options
    let mailOptions = {
        from: "vanshvanshkumar39@gmail.com",
        to: email,
        subject: "Revise Password Reset OTP",
        text: `Your OTP for password reset is ${otp}`,
    };
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    if (info.accepted.length > 0)
        sendRes(res, resIfEmailSent);
    else
        sendRes(res, resIfEmailNotSent);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=forgetpwdFunc.js.map