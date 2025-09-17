import { Request, Response, NextFunction} from 'express';
import { AppError} from  '../errorhandler/customerrorHandler'
import {ENV} from "../config/env"

export const errorHandler=(
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    //console.error("Error Caught:", err)

    if (err instanceof AppError){
        if(ENV.NODE_ENV === "development"){
            return res.status(err.statusCode).json({
                success:false,
                message: err.message,
                stack: err.stack
            })
        }
        // clean error in production 

        return res.status(err.statusCode).json({
            success:false,
            message:err.message
        })
      
    }
    //unexpected Error
      res.status(500).json({
            success:false,
            message:
            ENV.NODE_ENV === "development" ? err.message || "uexpected Error" : " something went wrong "
        })
    
}