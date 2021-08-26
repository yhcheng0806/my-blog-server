import express from "express";
import {
  getMsgList,
  sendMsg,
} from "../controllers/msgs.js";

const router = express.Router();


router.get("/:postId", getMsgList);;
router.post("/send", sendMsg);

export default router;