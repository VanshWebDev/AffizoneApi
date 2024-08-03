export const ifUsernameNotAvilable = {
  statusCode: 200,
  jsonObj: {
    message: "Username already taken",
    isUsernameAvilable: false,
  },
};
export const ifUsernameAvilable = {
  statusCode: 200,
  jsonObj: {
    message: "Username avilable",
    isUsernameAvilable: true,
  },
};
