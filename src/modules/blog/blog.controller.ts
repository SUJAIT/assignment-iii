/* eslint-disable no-console */
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "./blog.service";
import { Blog } from './blog.model';


const BlogCreate = catchAsync(
    async (req, res) => {
        const payload = req.body
        const user = req.user;
console.log(user,"blogU")

        const result = await blogService.BlogCreate(payload,user)
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: "Blog Created Successfully",
            data: result,
            success: true
        })
    }
)

const BlogUpdate = catchAsync(async (req:Request,res:Response)=>{
 const {id} = req.params;
 const body = req.body
 const userId = req.user?.id;
 if (!userId) {
   res.status(401).json({ message: 'Unauthorized: User not found' });
   return;
 }
 console.log(body,"body")

 const result = await blogService.BlogUpdate(id,body)
 console.log(result)

 const existingBlog = await Blog.findById(id).populate('author', 'details');
 if (!existingBlog) {
   res.status(404).json({ message: 'Blog not found' });
   return;
 }

 if (existingBlog.author._id.toString() !== userId) {
   res.status(403).json({ message: 'Forbidden: You are not the author of this blog' });
   return;
 }

 sendResponse(res,{
     statusCode: StatusCodes.OK,
     success: true,
     message:"Blog Update Succesfully",
     data: result
 })

 // Ensure the function returns void
})

export const blogController = {
    BlogCreate,
    BlogUpdate
}