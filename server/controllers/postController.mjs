import {
  getPosts as getPostsFromModel,
  getPostById as getPostByIdFromModel,
  createPost as createPostFromModel,
  updatePost as updatePostFromModel,
  deletePost as deletePostFromModel,
} from "../models/postModel.mjs";

// GET
export const getPosts = async (req, res) => {
  try {
    const payload = await getPostsFromModel(req.query);
    return res.status(200).json(payload);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const payload = await getPostByIdFromModel(req.params);
    return res.status(200).json(payload);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// POST
export const createPost = async (req, res) => {
  try {
    const payload = await createPostFromModel(req.body);
    return res.json(payload);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// PUT
export const updatePost = async (req, res) => {
  try {
    const payload = await updatePostFromModel(req);
    return res.json(payload);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// DELETE
export const deletePost = async (req, res) => {
  try {
    const payload = await deletePostFromModel(req.params);
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
