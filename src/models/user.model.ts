import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    sub: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    interest: {
      type: [String],
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
