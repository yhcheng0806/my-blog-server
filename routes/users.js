import express from "express";
import {
  followUser,
  unfollowUser,
  updateUser,
  deleteUser,
  getUser,
  getUserfollowers,
  getUserFollowList,
} from "../controllers/users.js";

const router = express.Router();

router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);
router.post("/update", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/:symbol", getUser);
router.get("/followers/:id", getUserfollowers);
router.get("/followList/:id", getUserFollowList);

export default router;
