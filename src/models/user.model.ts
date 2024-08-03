import mongoose from "mongoose";


const AttemptedMcqSchema = new mongoose.Schema(
  {
    mcqId: {
      type: String,
      required: true,
    },
    attemptedAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 60, // Set expiry time to 60 days
    },
  },
  { _id: false } // Disables automatic creation of _id for subdocuments
);



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
    },
    attemptedMcq:{
      type: [AttemptedMcqSchema],
      default: [],
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
