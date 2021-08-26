import Msg from "../models/Msg.js";
import User from "../models/User.js";

export const getMsgList = async (req, res) => {
  try {
    const msgs = await Msg.find({ postId: req.params.postId });
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
  try {
    const result = await Msg.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
