import { z } from "zod";

// Zod schema for TBlog
export const BlogSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    content: z.string().trim().min(1, "Content is required"),
    author: z.string().min(1, "User ID is required").optional(), // Assuming author is a MongoDB ObjectId stored as a string
    isPublished: z.boolean().optional().default(true),
    //   createdAt: z.date().optional(),
    //   updatedAt: z.date().optional(), 
});

export type TBlog = z.infer<typeof BlogSchema>;
