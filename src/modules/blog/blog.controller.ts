import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "./blog.service";


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
 console.log(body)
 const result = await blogService.BlogUpdate(id,body)
 console.log(result)

 sendResponse(res,{
     statusCode: StatusCodes.OK,
     success: true,
     message:"Blog Update Succesfully",
     data: result
 })

})

export const blogController = {
    BlogCreate,
    BlogUpdate
}