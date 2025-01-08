import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import Jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../../modules/user/user.model";
// import { Blog } from "../../modules/blog/blog.model";


const authUpdate = (requiredRole: string) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error("You Are Not Authorized !")
        }
        const decoded = Jwt.verify(token, "secret") as JwtPayload;
        const { email, role, isBlocked } = decoded;
        // const { email, role, isBlocked,id:userId } = decoded;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("You Are Not A Valid User")
        }

        if (requiredRole! === role) {
            throw new Error("You Are a Admin")
        }
if (isBlocked == true){
    throw new Error("You Are Blocked")
}

// const blogId = req.params.id;
// if (blogId !== userId) {
//   throw new Error("You are not authorized to update this blog!");
// }
// const blog = await Blog.findById(blogId);
// if (!blog) {
//   throw new Error("Blog not found!");
// }

// if (blog.author.toString() !== userId) {
//     throw new Error("You are not authorized to update this blog!");
//   }


req.user = decoded as JwtPayload;


next();


    })
}

export default authUpdate