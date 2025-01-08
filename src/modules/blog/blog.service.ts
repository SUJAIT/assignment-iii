/* eslint-disable no-console */

import { JwtPayload } from "jsonwebtoken";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";



const BlogCreate = async (payload: TBlog, user?: JwtPayload):Promise<TBlog> =>{
    

    const existingBlog = user ? await Blog.findOne({ author: user._id }) : null;

    if (existingBlog) {
        throw new Error('You have already created a blog');
    }

    // console.log(user,"one")
    const blogData = {
        ...payload,
        author: user ? user._id : undefined,

    };
    // console.log(blogData,'test')
const createdBlog = await Blog.create(blogData);
const populatedBlog = await Blog.findById(createdBlog._id).populate("author", "name email");
if (!populatedBlog) {
    throw new Error("Blog not found");
}
console.log(populatedBlog,"ppp")
return populatedBlog as TBlog;
}


const BlogUpdate = async(id:string,payload:Partial<TBlog>) =>{
    const result =await Blog.findByIdAndUpdate(id,payload ,{ new: true, runValidators: true })
    return result
}

const BlogDelete = async(id:string) =>{
    const result = await Blog.findByIdAndDelete(id)
    return result
}

const BlogFind = async() =>{
    const result = await Blog.find()
    return result
}

export const blogService = {
    BlogCreate,
    BlogUpdate,
    BlogDelete,
    BlogFind
}