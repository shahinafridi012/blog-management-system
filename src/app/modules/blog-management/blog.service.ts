import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const CreateBlogIntoDB = async (payload:TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogsFromDB = async () => {
  const result = await Blog.find().populate('author');
  return result;
};
const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true, // Return the updated document
  });
  return result;
};
const deleteBlog = async(id:string) =>{
  const result = await Blog.findByIdAndDelete(id,{new: true})
  return result
}
export const blogServices = {
  CreateBlogIntoDB,
  getAllBlogsFromDB,
  updateBlog,
  deleteBlog
};
