"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chkOtp = void 0;
const OTP = require("../../../models/otp.model");
const { OurErr } = require("../../../utils/error/errorClass");
const { verifyotpIfInvalid, verifyotpIfExpire } = require("./errObj");
const chkOtp = async (otp, userEmail) => {
    // Attempt to find the OTP record for the user
    const otpRecord = await OTP.findOne({ email: userEmail });
    // If the OTP record exists and the OTP matches the provided one, return true
    if (otpRecord) {
        if (otpRecord.otp === parseInt(otp))
            return true;
        // If the OTP record exists but the OTP is invalid, throw an error
        else
            throw new OurErr(verifyotpIfInvalid);
        // If the OTP record exists but has expired, throw an error
    }
    else
        throw new OurErr(verifyotpIfExpire);
};
exports.chkOtp = chkOtp;
//# sourceMappingURL=verifyoptFunc.js.map