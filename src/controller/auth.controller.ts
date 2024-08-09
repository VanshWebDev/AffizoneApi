//////////////////////////////////////////
require("dotenv").config();
// ------------- Third party packages -------------------
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
// ---------------- Local files --------------------------
// ---------------- Local files --------------------------
import { decryptJwt } from "../utils/token/crypt.utils";
import { tokenAuth } from "../utils/token/tokenAuth";
import { OurErr } from "../utils/error/errorClass";

// ---------------- Response objects ----------------------
import {
  ifUsernameNotAvilable,
  ifUsernameAvilable,
} from "../helpers/authController/checkUsernameAvailablity/resObj/resObj";
import {
  resIfUserExist,
  resIfUserNotExist,
} from "../helpers/authController/signup/resObj";
import { resIfPasswordMatch } from "../helpers/authController/login/resObj";
import { verifyotpIfPwdSuccessfullyReset } from "../helpers/authController/verifyotp/resObj";
import { ifOtpMatch } from "../helpers/authController/verifyOtpForSignup/resObj";
import { ifUserCreatedSuccessfully } from "../helpers/authController/signupWithEmail/resObj";
import { resIfEmailSent } from "../helpers/authController/forgetpwd/resObj";
import { ifUserWithSameEmailAlreadyExist } from "../helpers/authController/sendOtpForEmailVerification/resObj";

// ---------------- Error objects ---------------------------
import {
  checkTokenErr,
  checkTokenIfUserNot,
} from "../helpers/authController/checktoken/errObj";
import {
  ifUserDidntCreatedPassword,
  loginErr,
  loginErr1,
} from "../helpers/authController/login/errObj";
import {
  createPasswordErr,
  ifClientPayloadNot,
} from "../helpers/authController/createpassword/errObj";
import {
  forgetpwdIfUserNot,
  forgetpwdIfDuplicatekay,
  forgetpwdIfUsername,
} from "../helpers/authController/forgetpwd/errObj";
import { ifPayloadNot } from "../helpers/authController/signup/errObj";
import {
  ifEmailAlreadySent,
  ifEmailNot,
  ifTheUserRequestingOtpAlreadyExist,
} from "../helpers/authController/sendOtpForEmailVerification/errObj";
import {
  ifOtpNotMatch,
  ifOtpWithEmailNot,
} from "../helpers/authController/verifyOtpForSignup/errObj";
import {
  ifBothPwdNotEqual,
  ifUserWithEmailExist,
} from "../helpers/authController/signupWithEmail/errObj";
import { ifUserWithEmailNotExist } from "../helpers/authController/signinWithGoogle/errObj";
import {
  ifGooglePayloadNot,
  ifUserWithThisEmailExist,
} from "../helpers/authController/signupWithGoogle/errObj";

// ---------------- Helpers functions --------------------------
import {
  checkUserPayload,
  saveUser,
  checkUsername,
} from "../helpers/authController/createpassword/createpasswordFunc";
import {
  sendRes,
  checkIfMail,
  checkPassword,
  getPayloadFromGoogle,
} from "../helpers/reusable/reuableFunc";
import {
  generateOtp,
  sendEmail,
} from "../helpers/authController/forgetpwd/forgetpwdFunc";
import { chkOtp } from "../helpers/authController/verifyotp/verifyoptFunc";
import { checkIfUserExist } from "../helpers/authController/checkUsernameAvailablity/checkUsernameAvailablity";
import {
  getUserIfEamil,
  getUserIfUsername,
  resIfUserObj,
} from "../helpers/authController/checktoken/checktokenFunc";
import { generateAffiname } from "../helpers/authController/signupWithGoogle/signupWithGoogleFunc";

// ---------------- Mongoose models -----------------------
import { OTP } from "../models/otp.model";
import { User } from "../models/user.model";
import { VerifyEmailOtp } from "../models/verifyEmailOtps.model";
import {
  ifSignupSuccessWithGoogle,
  ifUserWithEmailAlreadyExist,
} from "../helpers/authController/signupWithGoogle/resObj";
// ---------------- .env variables --------------------------
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const cryptoSecret = process.env.CRYPTO_SECRET || "";
////////////////////////////////////////////////

export const signup = async (req: Request, res: Response) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload() as TokenPayload;

  if (!payload || !payload?.email) throw new OurErr(ifPayloadNot);

  const checkUser = await User.findOne({ email: payload.email });

  if (checkUser) tokenAuth(req, res, checkUser.email, resIfUserExist);
  else tokenAuth(req, res, payload.email, resIfUserNotExist);
};

export const login = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;

  let checkuser;
  if (checkIfMail(emailOrUsername)) {
    checkuser = await User.findOne({ email: emailOrUsername }).select(
      "+password"
    );
  } else {
    checkuser = await User.findOne({ affiname: emailOrUsername }).select(
      "+password"
    );
  }

  if (!checkuser) {
    throw new OurErr(loginErr);
  }
  if (!checkuser.password) throw new OurErr(ifUserDidntCreatedPassword);
  else {
    const isMatch = await bcrypt.compare(password, checkuser.password);
    if (isMatch) {
      tokenAuth(req, res, emailOrUsername, resIfPasswordMatch);
    } else {
      throw new OurErr(loginErr1);
    }
  }
};

export const checkToken = async (req: Request, res: Response) => {
  const token = req.signedCookies.token;

  if (!token) throw new OurErr(checkTokenErr); //Error if token not found in frontend.

  const payload = decryptJwt(token, cryptoSecret) as JwtPayload;

  const { email } = payload;

  let user;

  if (checkIfMail(payload.email)) user = await getUserIfEamil(email);
  //
  else user = await getUserIfUsername(email);

  if (!user) throw new OurErr(checkTokenIfUserNot);
  //
  else sendRes(res, resIfUserObj(user));
};

export const createpassword = async (req: Request, res: Response) => {
  const { password, confirmPassword, username } = req.body;

  const { token } = req.signedCookies;

  const usernameRes = await checkUsername(username);

  let passwordRes;
  if (usernameRes) passwordRes = checkPassword(password, confirmPassword);

  let payloadRes, clientPayload;
  if (passwordRes) {
    clientPayload = decryptJwt(token, cryptoSecret) as JwtPayload;

    payloadRes = await checkUserPayload(clientPayload);
  }

  if (payloadRes) {
    if (!clientPayload) throw new OurErr(ifClientPayloadNot);

    await saveUser(res, password, username, clientPayload);
  } else throw new OurErr(createPasswordErr);
};

export const checkUsernameAvailablity = async (req: Request, res: Response) => {
  const { usr } = req.query as { usr?: string };

  if (usr) {
    const checkUsernameRes = await checkIfUserExist(usr);

    if (checkUsernameRes) sendRes(res, ifUsernameNotAvilable);
    else sendRes(res, ifUsernameAvilable);
  }
};

export const forgetpassword = async (req: Request, res: Response) => {
  const { emailOrUsername } = req.body;

  let isEmail = checkIfMail(emailOrUsername);

  let userEmail;

  if (isEmail) userEmail = await User.find({ email: emailOrUsername });
  else throw new OurErr(forgetpwdIfUsername);

  if (!userEmail || userEmail.length == 0) throw new OurErr(forgetpwdIfUserNot);

  const otp = generateOtp();

  await OTP.create({ email: userEmail[0].email, otp: otp }).catch(
    (err: any) => {
      if (err.code === 11000) {
        throw new OurErr(forgetpwdIfDuplicatekay);
      }
    }
  );

  const isOtpSent = await sendEmail(
    res,
    userEmail[0].email,
    otp,
    "forgetpassword"
  );

  if (userEmail.length == 1) {
    if (isOtpSent) sendRes(res, resIfEmailSent);
  } else {
    res
      .status(200)
      .send({
        message: "OTP Send successfully",
        multipleUser: true,
        affinameList: userEmail,
        emailSent: true,
      });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { otp, newPassword, confirmPassword, email, selectedUser } = req.body;
  console.log(req.body);
  await chkOtp(otp, email);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.updateOne(
    { affiname: selectedUser },
    { password: hashedPassword }
  );

  await OTP.deleteOne({ email });

  sendRes(res, verifyotpIfPwdSuccessfullyReset);
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    secure: true, // Use secure: true if serving over HTTPS
    sameSite: "none", // Specify SameSite attribute as None
  });
  // Add any other logout logic here
  res.status(200).send({ message: "Logout successfully" });
};

export const sendOtpForEmailVerification = async (
  req: Request,
  res: Response
) => {
  const { email, wantToCreateNewAcc} = req.body;
  console.log(wantToCreateNewAcc)
  if (!email) throw new OurErr(ifEmailNot);

  const existUser = await User.findOne({ email });

  if(!wantToCreateNewAcc){
    if (existUser) {
      sendRes(res, ifUserWithSameEmailAlreadyExist);
      return;
    }
  }
  const otp = generateOtp();

  const createdOtp = await VerifyEmailOtp.findOne({ email });

  if (createdOtp) throw new OurErr(ifEmailAlreadySent);

  const isOtpSent = await sendEmail(res, email, otp, "Email verification");
  
  if(isOtpSent) sendRes(res, resIfEmailSent);

  await VerifyEmailOtp.create({ email, otp });
};

export const verifyOtpForSignup = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const createdOtp = await VerifyEmailOtp.findOne({ email });

  if (!createdOtp) throw new OurErr(ifOtpWithEmailNot);

  if (createdOtp.otp !== otp) throw new OurErr(ifOtpNotMatch);

  sendRes(res, ifOtpMatch);
};

export const signupWithEmail = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, affiname } = req.body;
  console.log(req.body)
  if (password !== confirmPassword) throw new OurErr(ifBothPwdNotEqual);

  const checkEmail = await User.findOne({ email });

  // if (checkEmail) throw new OurErr(ifUserWithEmailExist);

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ affiname, email,password: hashedPassword });
 
  tokenAuth(req, res, affiname, ifUserCreatedSuccessfully)

  await VerifyEmailOtp.deleteOne({ email });
};

export const signinWithGoogle = async (req: Request, res: Response) => {
  const { token } = req.body;

  const payload = await getPayloadFromGoogle(token);

  const { email } = payload;

  const user = await User.findOne({ email });

  if (!user) throw new OurErr(ifUserWithEmailNotExist);

  if (email)
    tokenAuth(req, res, email, {
      cookieName: "token",
      statusCode: 200,
      message: "signup successfull",
      isNewUser: false,
    });
};

export const signupWithGoogle = async (req: Request, res: Response) => {
  const { token, wantToCreateNewAcc } = req.body;

  const payload = await getPayloadFromGoogle(token);

  if (!payload || !payload.email) throw new OurErr(ifGooglePayloadNot);

  const { email, name, picture } = payload;

  if (!wantToCreateNewAcc) {
    const user = await User.findOne({ email });
    if (user) {
      sendRes(res, ifUserWithEmailAlreadyExist);
      return;
    }
  }

  const affiname = await generateAffiname(email);

  const newUser = await User.create({ affiname, email, name, picture });

  if (newUser) tokenAuth(req, res, email, ifSignupSuccessWithGoogle);
};
