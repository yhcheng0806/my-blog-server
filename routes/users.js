import express from "express";
import {
  followUser,
  unfollowUser,
  updateUser,
  deleteUser,
  getUser,
  getUserfanList,
  getUserFollowList,
} from "../controllers/users.js";

const router = express.Router();

router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/:symbol", getUser);
router.get("/fanList/:id", getUserfanList);
router.get("/followList/:id", getUserFollowList);

export default router;
