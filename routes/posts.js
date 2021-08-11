import express from "express";
import {
  createPost,
  followPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getAllPost,
} from "../controllers/posts.js";

const router = express.Router();
router.post("/create", createPost);
router.post("/follow", followPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
router.put("/like/:id", likePost);
router.get("/:id", getPost);
router.get("/", getAllPost);

export default router;
