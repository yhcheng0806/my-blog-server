import express from "express";
import {
  createPost,
  followingPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getPosts,
  getSelfPosts,
} from "../controllers/posts.js";

const router = express.Router();
router.post("/create", createPost);
router.post("/following", followingPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
router.put("/like/:id", likePost);
router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/self", getSelfPosts);

export default router;
