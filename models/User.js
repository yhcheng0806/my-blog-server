import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    account: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, default: "" },
    hashedPassword: { type: String },
    email: { type: String, unique: true, default: "" },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

export default User;
