import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.register(req.body)
    sendResponse(res, {
        success: true,
        message: "User registered successfully",
        statusCode: StatusCodes.CREATED,
        data: { id: result.id, name: result.name, email: result.email },
    
    })
})
const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.login(req.body)
       // Set token in response header
       res.setHeader('Authorization', `Bearer ${result.token}`);
    sendResponse(res, {
        success: true,
        message: "Login successfully",
        statusCode: StatusCodes.OK,
        data: {token:result.token}
        // token:result.token,
     
    })
})

export const AuthController = {
    register,
    login
}