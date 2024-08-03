import { User } from "../../../models/user.model";

export const checkIfUserExist = async (usr: string) => {
  const existingUser = await User.findOne({ username: usr }).select("username");
  if (existingUser) return true;
  else return false;
};
