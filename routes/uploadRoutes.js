import express from "express";
import multer from "multer";

import { upload } from "../controllers/upload.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "static"),
  filename: (req, file, cb) => cb(null, req.body.name),
});
const _upload = multer({ storage });

const router = express.Router();
router.post("/", _upload.single("file"), upload);

export default router;
