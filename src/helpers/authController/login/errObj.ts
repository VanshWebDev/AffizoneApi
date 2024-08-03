export const ifPasswordNotMatch = {
  status: 422,
  message: "password does not match",
  forFrontend: true,
};

export const loginErr = {
  status: 401,
  message: "User not found",
  forFrontend: true,
};

export const loginErr1 = {
  status: 401,
  message: "Password does not match",
  forFrontend: true,
};
