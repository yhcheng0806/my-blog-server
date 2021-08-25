import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String, default: ""
    },
    username: {
      type: String, default: ""
    },
    avatar: {
      type: String, default: ""
    },
    desc: { type: String, required: true },
    photos: { type: Array, default: [] },
    collects: { type: Array, default: [] },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);

export default Post;
