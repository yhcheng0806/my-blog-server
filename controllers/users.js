import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const followUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (id === userId) return res.status(403).json({ message: "你不能关注自己" });

  try {
    const user = await User.findById(id);
    const currentUser = await User.findById(userId);
    if (user.fanList.includes(userId))
      return res.status(403).json({ message: "你已经关注该用户" });

    await user?.updateOne({ $push: { fanList: userId } });
    await currentUser?.updateOne({ $push: { followList: id } });

    // res.status(200).json({ message: "已关注" });
    res.status(200).json({});
  } catch (error) {
    res.status(500).json(error);
  }
};

export const unfollowUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (id === userId) return res.status(403).json({ message: "你不能取关自己" });

  const user = await User.findById(id);
  const currentUser = await User.findById(userId);

  if (!user.fanList.includes(userId))
    return res.status(403).json({ message: "你已经取消关注" });

  await user?.updateOne({ $pull: { fanList: userId } });
  await currentUser?.updateOne({ $pull: { followList: id } });

  // res.status(200).json({ message: "已取关" });
  res.status(200).json({});
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userId, isAdmin } = req.body;

  if (id !== userId && !isAdmin)
    return res.status(403).json({ message: "你不能更改他人的信息" });

  try {
    const currentUser = await User.findById(userId);
    // const validated = await bcrypt.compare(password, currentUser.password);

    // if (!validated) return res.status(403).json({ message: "密码错误" });

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    await currentUser?.updateOne({
      $set: req.body
    });

    res.status(200).json({ message: "修改成功" });
  } catch (error) {
    console.log(error, "--error");
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { userId, isAdmin } = req.body;

  if (id !== userId && !isAdmin)
    return res.status(403).json({ message: "你不能删除他人的信息" });

  try {
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "删除成功" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  const { symbol } = req.params;

  const options = [];
  options.push(
    symbol.length >= 20
      ? {
          _id: symbol,
        }
      : { username: symbol }
  );

  try {
    const user = await User.findOne({
      $or: options,
    });
    const { password, updatedAt, ...other } = user?._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserfanList = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User?.findById(id);
    const fanList = await Promise.all(
      user?.fanList.map((fanId) => {
        return User?.findById(fanId);
      })
    );

    let result = [];

    fanList.map((item) => {
      const { _id, username, avatar } = item;
      result.push({ _id, username, avatar });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserFollowList = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User?.findById(id);
    const followList = await Promise.all(
      user?.followList.map((fanId) => {
        return User?.findById(fanId);
      })
    );

    let result = [];

    followList.map((item) => {
      const { _id, username, avatar } = item;
      result.push({ _id, username, avatar });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
