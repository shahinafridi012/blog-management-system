import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { blogServices } from './blog.service';
import httpStatus from 'http-status';

const CreateBlog = catchAsync(async (req, res) => {
  const result = await blogServices.CreateBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BLog is created succesfully',
    data: result,
  });
});
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully!',
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await blogServices.updateBlog(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully!',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.deleteBlog(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully!",
    data: result,
  });
});


export const BlogControllers = {
  CreateBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog
};
