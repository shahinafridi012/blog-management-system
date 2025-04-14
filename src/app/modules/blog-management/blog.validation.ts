import { z } from 'zod';

export const blogSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
    author: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Author ObjectId"),
    isPublished: z.boolean().optional(),  // Optional since Mongo defaults to true
  }),
});

export const BlogValidation = {
  blogSchema,
};
