import { Response } from "express";

import { createCookieOptions } from "../../../constant/optionObj/optionObj";

// import PwdVerify from "../../../models/pwdVerify.model";
import  {PwdVerify}  from "../../../models/pwdVerify.model";

/**
 * Saves user information into the session object.
 * @param {object} payload - The payload containing user information to be saved.
 * @param {object} req - The request object from an Express.js route handler.
 */

interface payload {
  email: string;
  sub: string;
  name: string;
  picture: string;
}

export const saveIntoDB = async (payload: payload) => {
  const user = {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
  const existUser = await PwdVerify.findOne({ email: user.email });
  if (existUser) {
    existUser.updateOne(user);
    return;
  }
};

/**
 * Sets an HTTP cookie on the response object.
 *
 * @param {object} res - The response object from an Express.js route handler.
 * @param {string} cookieName - The name of the cookie to set.
 * @param {string} token - The value to set for the cookie.
 */
export const createCookie = (
  res: Response,
  cookieName: string,
  token: string
) => {
  res.cookie(cookieName, token, createCookieOptions);
};
