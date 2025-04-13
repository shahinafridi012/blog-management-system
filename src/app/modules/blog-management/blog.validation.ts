import { z } from 'zod';

export const blogSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
  }),
});

export const BlogValidation = {
  blogSchema,
};
