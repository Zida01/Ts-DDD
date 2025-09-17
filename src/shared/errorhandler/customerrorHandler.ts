

export class AppError extends Error {
    statusCode! : number ;
    isOperational! : boolean;

    constructor(message:string, statusCode=500, isOperational=true){
        super(message);
        this.statusCode= statusCode;
        this.isOperational= isOperational
        
      
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    }
}

 export class ConflictError extends AppError{
    constructor(message= "conflict"){
        super(message, 409)
    }

 }


 export class NotFoundError extends AppError {
    constructor(message= "resources not found"){
         super(message, 404)
    }
  
 }

export class ValidatiorError extends AppError {
    constructor(message="Invalid request or data"){
        super(message, 409 )
    }
}

export class databaseError extends AppError{
    constructor(message= 'database error'){
        super( message , 500, false)
    }
}

 export class ConnectionError extends AppError{
    constructor(message= "database connection failed"){
    super(message, 503 , false)
    }
   

 }