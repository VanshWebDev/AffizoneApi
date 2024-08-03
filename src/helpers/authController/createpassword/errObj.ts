export const ifUsernameUndefined = {
  status: 404,
  message: "Username not found",
  forFrontend: true,
};
export const ifUsernameNotValid = {
  status: 401,
  message: "Use only small letters, numbers, and underscores.",
  forFrontend: true,
};
export const ifLengthNotValid = {
  status: 401,
  message: "Username must be between 3 and 30 characters.",
  forFrontend: true,
};
export const ifUsernameExist = {
  status: 401,
  message: "Username already exist",
  forFrontend: true,
};

export const createPasswordErr = {
  status: 400,
  message: "Something went wrong",
  forFrontend: true,
};

export const ifClientPayloadNot = {
  status: 400,
  message: "payload not defined",
  forFrontend: true,
};
