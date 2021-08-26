import mongoose from "mongoose";

const MsgSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    from: { type: String, default: "", required: true },
    to: { type: String, default: "", required: true },
    msg: {
      type: String,
      default: "",
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Msg = mongoose.model("Msg", MsgSchema);

export default Msg;
