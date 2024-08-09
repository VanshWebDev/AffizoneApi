import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    affiname: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      select: false,
    },
    name: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
