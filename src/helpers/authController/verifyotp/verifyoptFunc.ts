import { OTP } from "../../../models/otp.model";
import { OurErr } from "../../../utils/error/errorClass";
import { verifyotpIfInvalid, verifyotpIfExpire } from "./errObj";

export const chkOtp = async (otp: string, userEmail: string) => {
  // Attempt to find the OTP record for the user
  const otpRecord = await OTP.findOne({ email: userEmail });

  // If the OTP record exists and the OTP matches the provided one, return true
  if (otpRecord) {
    if (otpRecord.otp === parseInt(otp)) return true;
    // If the OTP record exists but the OTP is invalid, throw an error
    else throw new OurErr(verifyotpIfInvalid);
    // If the OTP record exists but has expired, throw an error
  } else throw new OurErr(verifyotpIfExpire);
};
