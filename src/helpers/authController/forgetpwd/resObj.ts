export const resIfEmailSent = {
  statusCode: 200,
  jsonObj: {
    message: "Email sent successfully",
    emailSent: true,
  },
};

export const resIfEmailNotSent = {
  statusCode: 200,
  jsonObj: {
    message: "Email could't sent try after sometime",
    emailSent: false,
  },
};
