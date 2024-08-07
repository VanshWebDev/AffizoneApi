import { Response } from "express";
import { couldntSendOtp } from "./errObj";
import { OurErr } from "../../../utils/error/errorClass";

const nodemailer = require("nodemailer");
const { sendRes } = require("../../reusable/reuableFunc");
const { resIfEmailSent } = require("./resObj");

export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
  return otp;
};

export const sendEmail = async (res:Response, email:string, otp:number, key:string):Promise<void> => {
  // Create a transporter object with SMTP settings
  let transporter = nodemailer.createTransport({
    service: "Gmail", // Example: Gmail, you can use any email service provider
    auth: {
      user: "vanshvanshkumar39@gmail.com", // Your email
      pass: "qudr vvki akbb mrma", // Your email password
    },
  });

  let subject = "";
  // Define the email 
  if(key=="Email verification")subject = "email verification"
  else if(key=="forgetpassword") subject = "password reset";
  
  let mailOptions = {
    from: "vanshvanshkumar39@gmail.com",
    to: email,
    subject: `Revise ${subject} OTP`,
    text: `Your OTP for ${subject} is ${otp}`,
  };

  // Send the email
  let info = await transporter.sendMail(mailOptions);
  if (info.accepted.length > 0) sendRes(res, resIfEmailSent);
  else throw new OurErr(couldntSendOtp);
};
