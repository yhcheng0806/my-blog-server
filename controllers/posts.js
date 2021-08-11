import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const followPost = async (req, res) => {
  try {
    const { userId } = req.body;

    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ userId });

    const followList = await Promise.all(
      currentUser?.followList.map((followId) => {
        return Post.find({ userId: followId });
      })
    );

    res.status(200).json(userPosts.concat(...followList));
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({});
    } else {
      res.status(403).json({ message: "用户id识别错误" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({});
    } else {
      res.status(403).json({ message: "用户id识别错误" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    const options = post.likes.includes(userId)
      ? {
          $pull: { likes: userId },
        }
      : {
          $push: { likes: userId },
        };
    await post.updateOne(options);
    res.status(200).json({
      like: !post.likes.includes(userId),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
