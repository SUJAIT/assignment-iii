
import  Jwt from 'jsonwebtoken';
import  bcrypt  from 'bcrypt';
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";


const register = async(payload:IUser) =>{
    const result = await User.create(payload);
    return result
}

const login = async(payload:ILoginUser)=>{
    const user = await User.findOne({email:payload?.email}).select("+password");
    // console.log({user})
    if(!user){
        throw new Error('User not found')
    }
    // const isBlocked = user?.isBlocked;
    // if(isBlocked === true){
    //     throw new Error('User is a Blocked!!!')
    // }
    const isPasswordMatch = await bcrypt.compare(payload?.password,user?.password);
    if(!isPasswordMatch){
        throw new Error("Wrong Password !")
    }

    //jwt

    
const token = Jwt.sign({id:user?.id,email:user?.email, role:user?.role, isBlocked:user?.isBlocked,name:user?.name}, "secret",{expiresIn:"1d"})

console.log(token)
const verifiedUser = {id:user?.id,name:user?.name,email:user?.email,role:user?.role,isBlocked:user?.isBlocked}

console.log(verifiedUser,"verifiedUser")


 // Set token in response header



return {token ,verifiedUser}
    ///
    
}

export const AuthServices = {
    register,
    login
}