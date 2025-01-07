import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import Jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../../modules/user/user.model";


const auth = (requiredRole: string) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error("You Are Not Authorized !")
        }
        const decoded = Jwt.verify(token, "secret") as JwtPayload;
        const { email, role, isBlocked,name } = decoded;
console.log("Name:",name)
        const user = await User.findOne({ email: email });
        // console.log(user,"User")

        // if (user) {
        //     req.user = user;
        // } else {
        //     throw new Error("You Are Not A Valid User");
        // }
        
        



        if (!user) {
            throw new Error("You Are Not A Valid User")
        }

        if (requiredRole! === role) {
            throw new Error("You Are a Admin")
        }
if (isBlocked == true){
    throw new Error("You Are Blocked")
}

// if (id ! == id){
// throw new Error("You are Note Valid User For Update data")
// }

req.user = decoded as JwtPayload;
next();


    })
}

export default auth