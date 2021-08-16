import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const __dirname = path.resolve();
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("*", (req, res, next) => {
  console.log(req.path, "-----all-");
  // response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });      //设置响应头属性值
  next();
});

app.use("/images", express.static(path.join(__dirname, "/images")));

//多资源托管
app.use(express.static(path.join(__dirname, "public", "template")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => res.send(`<div>server home</div>`));

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
