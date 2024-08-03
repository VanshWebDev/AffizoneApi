export const verifyotpIfInvalid = {
  status: 400,
  message: "Invalid OTP",
  forFrontend: true,
};

export const verifyotpIfExpire = {
  status: 404,
  message: "OTP expired generate new one",
  forFrontend: true,
};
