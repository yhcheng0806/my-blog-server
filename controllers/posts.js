import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatePost = async (req, res) => {};
export const deletePost = async (req, res) => {};
export const likePost = async (req, res) => {};
export const getPost = async (req, res) => {};
export const getAllPost = async (req, res) => {};
