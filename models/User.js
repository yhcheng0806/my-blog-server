import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    account: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, default: "" },
    email: { type: String, default: "" },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

export default User;
