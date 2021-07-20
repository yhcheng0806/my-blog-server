import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { account, password } = req.body;
  try {
    const existingUser = await User.findOne({ account });
    if (!existingUser) return res.status(400).json({ msg: "用户不存在！" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    const isPassword = password === existingUser.password;
    if (!isPasswordCorrect && !isPassword)
      return res.status(400).json({ message: "登录无效" });

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
  const { account, password } = req.body;

  try {
    const existingUser = await User.findOne({ account });
    if (existingUser) return res.status(400).json({ message: "用户已存在！" });

    const hashedPassword = await bcrypt.hashSync(password, 12);

    console.log(hashedPassword, "--hashedPassword--");

    const result = await User.create({ account, hashedPassword, password });
    console.log(result, "--result--");
    const token = jwt.sign(
      { account: result.account, id: result._id },
      "test",
      { expiresIn: "1h" }
    );
    console.log(token, "--token--");

    res.status(200).json({ token, result });
  } catch (error) {
    console.log(error, "--error--");

    res.status(500).json(error);
  }
};
