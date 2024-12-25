import { Types } from "mongoose";


export interface TBlog {
    title: string,
    content: string,
    isPublished: boolean,
    createdAt: Date ,
    updatedAt:Date,
    author:Types.ObjectId;
}