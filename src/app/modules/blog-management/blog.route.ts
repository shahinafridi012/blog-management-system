import express from "express";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

router.post("/", BlogControllers.CreateBlog);  // endpoint is now `/api/blogs`
router.get("/", BlogControllers.getAllBlogs);  // endpoint is now `/api/blogs`
router.patch('/:id', BlogControllers.updateBlog)
router.delete('/:id', BlogControllers.deleteBlog)
export const blogRoutes = router;
