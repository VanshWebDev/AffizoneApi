export const ifSignupSuccessWithGoogle = {
  cookieName: "token",
  statusCode: 200,
  message: "user created successfull",
  isNewUser: true,
};

export const ifUserWithEmailAlreadyExist = {
  statusCode: 200,
  jsonObj: {
    message: "User with this email already exists",
    exist: true,
  },
};
