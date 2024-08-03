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

// ---------------- Error objects ---------------------------
import {
  checkTokenErr,
  checkTokenIfUserNot,
} from "../helpers/authController/checktoken/errObj";
import { loginErr, loginErr1 } from "../helpers/authController/login/errObj";
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

// ---------------- Mongoose models -----------------------
import { OTP } from "../models/otp.model";
import { User } from "../models/user.model";

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
    checkuser = await User.findOne({ username: emailOrUsername }).select(
      "+password"
    );
  }

  if (!checkuser || !checkuser?.password) {
    throw new OurErr(loginErr);
  } else {
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

  if (!token) {
    throw new OurErr(checkTokenErr); //Error if token not found in frontend.
  } else {
    const payload = decryptJwt(token, cryptoSecret) as JwtPayload;

    const { email } = payload;

    let user;

    if (checkIfMail(payload.email)) user = await getUserIfEamil(email);
    //
    else user = await getUserIfUsername(email);

    if (!user) throw new OurErr(checkTokenIfUserNot);
    //
    else sendRes(res, resIfUserObj(user));
  }
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

// Password reset handler
export const forgetpassword = async (req: Request, res: Response) => {
  const { emailOrUsername } = req.body;

  let isEmail = checkIfMail(emailOrUsername);

  let userEmail;

  if (isEmail)
    userEmail = await User.findOne({ email: emailOrUsername }).select("email");
  else throw new OurErr(forgetpwdIfUsername);

  // throw err if user not exist in DB
  if (!userEmail) throw new OurErr(forgetpwdIfUserNot);

  const otp = generateOtp();

  await OTP.create({ email: userEmail.email, otp: otp }).catch((err: any) => {
    if (err.code === 11000) {
      throw new OurErr(forgetpwdIfDuplicatekay);
    }
  });

  await sendEmail(res, userEmail.email, otp);
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { otp, newPassword, confirmPassword, userEmail } = req.body;

  await chkOtp(otp, userEmail);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.updateOne({ email: userEmail }, { password: hashedPassword });

  await OTP.deleteOne({ email: userEmail });

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

export const  Ram = async (req:Request, res:Response) =>{
    res.send("Jai Shri Ram 🍀");
}