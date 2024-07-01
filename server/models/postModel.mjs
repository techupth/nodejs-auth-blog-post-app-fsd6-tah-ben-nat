import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

// GET
export const getPosts = async (resQuery) => {
  const status = resQuery.status;
  const keywords = resQuery.keywords;
  const page = resQuery.page;

  const PAGE_SIZE = 5;
  const skip = PAGE_SIZE * (page - 1);

  const query = {};

  if (status) {
    query.status = status;
  } else if (keywords) {
    query.title = new RegExp(`${keywords}`, "i");
  }

  const collection = db.collection("posts");
  const posts = await collection
    .find(query)
    .sort({ published_at: -1 })
    .skip(skip)
    .limit(5)
    .toArray();

  const count = await collection.countDocuments(query);
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const payload = {
    data: posts,
    total_pages: totalPages,
  };

  return payload;
};

export const getPostById = async (params) => {
  const postId = ObjectId(params.id);
  const collection = db.collection("posts");
  const post = await collection.find({ _id: postId }).toArray();
  const payload = { data: post[0] };
  return payload;
};

// POST
export const createPost = async (reqBody) => {
  const hasPublished = reqBody.status === "published";
  const newPost = {
    ...reqBody,
    created_at: new Date(),
    updated_at: new Date(),
    published_at: hasPublished ? new Date() : null,
  };

  const collection = db.collection("posts");
  await collection.insertOne(newPost);

  const payload = {
    message: "Post has been created.",
  };
  return payload;
};

// PUT
export const updatePost = async (req) => {
  const hasPublished = req.body.status === "published";

  const updatedPost = {
    ...req.body,
    updated_at: new Date(),
    published_at: hasPublished ? new Date() : null,
  };
  const postId = ObjectId(req.params.id);
  const collection = db.collection("posts");
  await collection.updateOne(
    { _id: postId },
    {
      $set: updatedPost,
    }
  );

  const payload = { message: `Post ${postId} has been updated.` };
  return payload;
};

// DELETE
export const deletePost = async (params) => {
  const postId = ObjectId(params.id);
  const collection = db.collection("posts");
  await collection.deleteOne({ _id: postId });
  const payload = {
    message: `Post ${postId} has been deleted.`,
  };
  return payload;
};
