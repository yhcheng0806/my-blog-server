import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  const { userId } = req.body;

  try {
    const currentUser = await User.findById(userId);
    const { name, username, avatar } = currentUser;

    const newPost = await Post.create({
      ...req.body,
      name,
      username,
      avatar,
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const followingPost = async (req, res) => {
  try {
    const { userId } = req.body;

    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ userId });

    const following = await Promise.all(
      currentUser?.following.map((followId) => {
        return Post.find({ userId: followId });
      })
    );

    res.status(200).json(userPosts.concat(...following));
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
      res.status(200).json({ message: "用户id识别错误" });
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
      res.status(200).json({ message: "用户id识别错误" });
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
    res.status(200).json();
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
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSelfPosts = async (req, res) => {
  const { username, userId } = req.body;
  try {
    const posts = await Post.find({
      $or: [{ username }, { userId }],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
