/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from "jsonwebtoken";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";



const BlogCreate = async (payload: TBlog, user?: JwtPayload):Promise<TBlog> =>{
    
    console.log(user,"one")
    const blogData = {
        ...payload,
        author: user ? user.id : undefined, // Assign the logged-in user's ID to the author field
    };
    console.log(blogData,'test')
    const result = await Blog.create(blogData).then(blog => blog.populate('author'));
    return result
}

const BlogUpdate = async(id:string,payload:Partial<TBlog>) =>{
    const result =await Blog.findByIdAndUpdate(id,payload ,{ new: true, runValidators: true })
    return result
}

export const blogService = {
    BlogCreate,
    BlogUpdate
}