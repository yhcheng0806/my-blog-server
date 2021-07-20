import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    photo: { type: String },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);

export default Post;
