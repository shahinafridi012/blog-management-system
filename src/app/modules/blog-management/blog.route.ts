import express from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BlogValidation.blogSchema),
  BlogControllers.CreateBlog
);
router.get('/', BlogControllers.getAllBlogs);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  BlogControllers.updateBlog
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  
  BlogControllers.deleteBlog
);
export const blogRoutes = router;
