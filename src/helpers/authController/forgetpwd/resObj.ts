export const resIfEmailSent = {
  statusCode: 200,
  jsonObj: {
    message: "OTP sent successfully",
    emailSent: true,
  },
};

export const resIfEmailNotSent = {
  statusCode: 200,
  jsonObj: {
    message: "OTP could't sent try after sometime",
    emailSent: false,
  },
};
