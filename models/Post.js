import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: { type: String, required: true },
    photo: { type: String, default: "" },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);

export default Post;
