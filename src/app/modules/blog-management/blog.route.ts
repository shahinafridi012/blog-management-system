import express from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogValidation.blogSchema),
  BlogControllers.CreateBlog
); // endpoint is now `/api/blogs`
router.get('/', BlogControllers.getAllBlogs); // endpoint is now `/api/blogs`
router.patch('/:id', BlogControllers.updateBlog);
router.delete(
  '/:id',
  validateRequest(BlogValidation.blogSchema),
  BlogControllers.deleteBlog
);
export const blogRoutes = router;
