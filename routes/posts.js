import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getAllPost,
} from "../controllers/posts.js";

const router = express.Router();
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/all", getAllPost);

export default router;
