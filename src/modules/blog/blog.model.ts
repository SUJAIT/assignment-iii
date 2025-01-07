import  { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title:{
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
       
    },
    content:{
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
    },
    author: {
      type:Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
      unique: true,
      required: true,
    },
    isPublished:{
        type: Boolean,
        default: true,
      },
          //
    createdAt: {
        type: Date,
        default: Date.now
      },
      //
      updatedAt: {
        type: Date,
        default: Date.now
      }

},
{
    timestamps: true,
})

blogSchema.index({ author: 1 }, { unique: true });

export const Blog = model<TBlog>('Blog',blogSchema)