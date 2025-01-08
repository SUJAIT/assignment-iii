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
 const {title,content,isPublished} = req.body;
  const body = {title,content,isPublished}
 const userId = req.user?._id;
  const blog = await Blog.findById(id)

console.log( userId,"test222")
  console.log(id,"test0000")


  if(!blog){
    return  sendResponse(res,{
      statusCode: StatusCodes.OK,
      success: false,
      message:"Blog not found",
      data: "Blog not found"
  })
  }

  console.log( blog.author.toString(),"test111")
  console.log( !req.user,"test222")
  

  if ( blog.author.toString() !== userId) {
    return  sendResponse(res,{
      statusCode: StatusCodes.OK,
      success: false,
      message:"You are not authorized to update this blog",
      data: "data not found"
  })
  }

 const result = await blogService.BlogUpdate(id,body)
 console.log(result)


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