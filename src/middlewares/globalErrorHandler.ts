/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { zodErrorHandler } from "../helpers/zodErrorHandler"
import { castErrorHandler } from "../helpers/castErrorHandler"
import { validationErrorHandler } from "../helpers/validationErrorHandler"
import { duplicateErrorHandler } from "../helpers/duplicateErrorHandler"
import { genericErrorHandler } from "../helpers/genericErrorHandler"


export const globalErrorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
    if (err.name && err.name === "ZodError") {
        zodErrorHandler(err, res)
    }
    else if (err instanceof mongoose.Error.CastError) {
       castErrorHandler(err, res)
    }
    else if (err instanceof mongoose.Error.ValidationError) {
      validationErrorHandler(err, res)
    }
    else if (err.code && err.code === 11000) {
        duplicateErrorHandler(err, res)
    }
    else if (err instanceof Error) {
     genericErrorHandler(err, res)
    }
}
