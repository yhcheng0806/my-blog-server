import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    account: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: { type: String, min: 6, required: true },
    name: {
      type: String,
      default: "",
    },
    avatar: { type: String, default: "" },
    following: { type: Array, default: [] },
    followers: { type: Array, default: [] },
    describe: { type: String, default: "" },
    area: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

export default User;
