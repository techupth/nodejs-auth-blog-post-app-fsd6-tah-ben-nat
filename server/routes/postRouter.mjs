import { Router } from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.mjs";
import { protect } from "../middlewares/protect.js";

const postRouter = Router();

// 🐨 Todo: Exercise #5
// นำ Middleware `protect` มาใช้กับ `postRouter` ด้วย Function `app.use`

postRouter.get("/", [protect], getPosts);
postRouter.get("/:id", [protect], getPostById);
postRouter.post("/", [protect], createPost);
postRouter.put("/:id", [protect], updatePost);
postRouter.delete("/:id", [protect], deletePost);

export default postRouter;
