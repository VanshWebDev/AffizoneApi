import { User } from "../../../models/user.model";
import { Types } from "mongoose";

interface user {
  _id: Types.ObjectId;
  email: string;
  username?: string | null;
  interest: string[];
  picture: string;
}

export const resIfUserObj = (user: user) => {
  return {
    statusCode: 200,
    jsonObj: {
      message: "All done",
      user: {
        id: user?._id.toString(),
        email: user?.email,
        username: user?.username,
        interest: user?.interest,
        picture: user?.picture,
      },
    },
  };
};

export const getUserIfEamil = async (email: string) => {
  return await User.findOne({ email });
};

export const getUserIfUsername = async (username: string) => {
  return await User.findOne({ username });
};
