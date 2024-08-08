import { User } from "../../../models/user.model";
import { Types } from "mongoose";

interface user {
  _id: Types.ObjectId;
  email: string;
  affiname?: string | null;
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
        affiname: user?.affiname,
        picture: user?.picture,
      },
    },
  };
};

export const getUserIfEamil = async (email: string) => {
  return await User.findOne({ email });
};

export const getUserIfUsername = async (affiname: string) => {
  return await User.findOne({ affiname });
};
