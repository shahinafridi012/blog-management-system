import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
  title: {
    type: String,
    required: [true, "id is must be required"],

  },
  content: {
    type: String,
    required: [true, "Content must be required"],
  },
},
{
  timestamps: true
}
);

export const Blog = model<TBlog>("Blog", blogSchema);
