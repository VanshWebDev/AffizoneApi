export const ifUserWithSameEmailAlreadyExist = {
  statusCode: 200,
  jsonObj: {
    message: "User with this email already exists",
    exist: true,
  },
};
