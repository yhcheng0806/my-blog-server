import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { account, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username: account }, { account }],
    });
    if (!existingUser)
      return res
        .status(200)
        .json({ message: "你输入的帐号不属于任何帐户，请检查帐号并重试。" });
    const validated = await bcrypt.compare(password, existingUser.password);
    if (!validated) return res.status(200).json({ message: "密码错误" });

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
  const { account, username, password } = req.body;

  if (account.length === 11) {
    if (!/^1[3,5,7,8,9]\d{9}$/.test(account))
      return res.status(200).json({ message: "你的电话号码似乎不正确" });
  } else {
    if (
      !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(
        account
      )
    )
      return res.status(200).json({ message: "你的邮箱似乎不正确" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { account }],
    });
    if (existingUser) return res.status(200).json({ message: "用户已存在！" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      ...req.body,
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
