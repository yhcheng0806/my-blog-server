import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: { type: String, min: 6, required: true },
    avatar: { type: String, default: "" },
    coverImg: { type: String, default: "" },
    followList: { type: Array, default: [] },
    fanList: { type: Array, default: [] },
    describe: { type: String, default: "" },
    area: {
      type: Object,
      default: null,
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
