import Msg from "../models/Msg.js";
import User from "../models/User.js";

export const getMsgList = async (req, res, postId) => {
  try {
    const msgs = await Msg.find({ postId: postId || req.params.postId });
    const result = await Promise.all(
      msgs.map(async (msg) => {
        const fromUserInfo = await User.findById(msg.from);
        const toUserInfo = await User.findById(msg.to);

        return {
          ...msg._doc,
          from: {
            userId: fromUserInfo._id,
            avatar: fromUserInfo.avatar,
            username: fromUserInfo.username,
            name: fromUserInfo.name,
          },
          to: {
            userId: toUserInfo._id,
            avatar: toUserInfo.avatar,
            username: toUserInfo.username,
            name: toUserInfo.name,
          },
        };
      })
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const sendMsg = async (req, res) => {
  const { postId, from, to, msg } = req.body;

  const fromRes = await User.findById(from);
  const toRes = await User.findById(to);

  const fromUser = {
    _id: fromRes._id,
    avatar: fromRes.avatar,
    username: fromRes.username,
    name: fromRes.name,
  };

  const toUser = {
    _id: toRes._id,
    avatar: toRes.avatar,
    username: toRes.username,
    name: toRes.name,
  };

  try {
    const result = await Msg.create({
      postId,
      from,
      to,
      fromUser,
      toUser,
      msg,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
