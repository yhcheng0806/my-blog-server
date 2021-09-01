import express from "express";
import {
  getMsgList,
  likeMsg,
  sendMsg,
} from "../controllers/msgs.js";

const router = express.Router();


router.get("/:postId", getMsgList);;
router.post("/send", sendMsg);
router.put("/like/:id", likeMsg);


export default router;