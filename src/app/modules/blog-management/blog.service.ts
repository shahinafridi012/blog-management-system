// import AppError from '../../errors/AppError';
// import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
// import httpStatus from 'http-status';
// const CreateBlogIntoDB = async (id: string, payload: TBlog) => {
//   // const user = await User.findById(id); // Fetch the user by _id
//   // console.log(user);
//   // if (!user) {
//   //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not registered');
//   // }

//   // if (user._id.toString() !== payload.author.toString()) {
//   //   throw new AppError(
//   //     httpStatus.UNAUTHORIZED,
//   //     'You can only post as yourself'
//   //   );
//   // }

//   const result = await Blog.create(payload);
//   return result;
// };
const CreateBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await blogQuery.modelQuery;
  return result;
};

const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true, // Return the updated document
  });
  return result;
};
const deleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id, { new: true });
  return result;
};
export const blogServices = {
  CreateBlogIntoDB,
  getAllBlogsFromDB,
  updateBlog,
  deleteBlog,
};
