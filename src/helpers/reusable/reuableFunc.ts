import { Response } from "express";

const { OurErr } = require("../../utils/error/errorClass");
const { ifPasswordNotMatch } = require("../authController/login/errObj");

/**
 * Sends an HTTP response with the specified status code and JSON object.
 *
 * @param {object} res - The response object from an Express.js route handler.
 * @param {object} resObj - An object containing the status code and the JSON response body.
 * @param {number} resObj.statusCode - The HTTP status code for the response.
 * @param {object} resObj.jsonObj - The JSON object to include in the response body.
 */

interface resObj {
  statusCode: number;
  jsonObj: object;
}

export const sendRes = (res: Response, resObj: resObj) => {
  const { statusCode, jsonObj } = resObj;
  res.status(statusCode).json(jsonObj);
};

/**
 * Checks if a given string is a valid Gmail address.
 * @param {string} emailOrUsername - The string to be checked, which can be either an email or a username.
 * @returns {boolean} Returns `true` if the string is a valid Gmail address, otherwise `false`.
 */
export const checkIfMail = (emailOrUsername: string) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);
  const endsWithGmail = emailOrUsername.endsWith("@gmail.com");
  const endsWithEmail = emailOrUsername.endsWith("@email.com");
  return isEmail && (endsWithGmail || endsWithEmail);
};

/**
 *  Description: Validates if the provided password matches the confirmed password.
 * @function checkPassword
 * @param {string} password - The original password entered by the user.
 * @param {string} confirmPassword - The confirmation of the password to be checked against.
 */
export const checkPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    throw new OurErr(ifPasswordNotMatch);
  }
  if (password === confirmPassword) return true;
};
