export const resIfUserExist = {
  cookieName: "token",
  statusCode: 200,
  message: "login successful",
  isNewUser: false,
};

export const resIfUserNotExist = {
  cookieName: "token",
  statusCode: 200,
  message: "Create password in 120 second",
  isNewUser: true,
};
