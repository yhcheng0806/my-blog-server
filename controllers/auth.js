import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { account, password } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ username: account }, { email: account }],
    });
    if (!existingUser) return res.status(200).json({ message: "用户不存在！" });
    const validated = await bcrypt.compare(password, existingUser.password);
    if (!validated) return res.status(200).json({ message: "登录无效" });

    const token = jwt.sign(
      { account: existingUser.account, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, result: existingUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const register = async (req, res) => {
  const { username, email, password, confirmPass } = req.body;

  if (!username || !email || !password || !confirmPass) {
    return res.status(200).json({ message: "请完善内容" });
  }
  if (password !== confirmPass) {
    return res.status(200).json({ message: "两次密码不一致" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(200).json({ message: "用户已存在！" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const result = await User.create({
      ...req.body,
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { username: result.username, id: result._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, result });
  } catch (error) {
    res.status(500).json(error);
  }
};
