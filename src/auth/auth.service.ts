 import { ConflictError, CrudError } from "../shared/errorhandler/customerrorHandler";
import { authEntity } from "./auth.entity";
import { AuthRepository } from "./auth.repository";
import { registerDto } from "./dto/auth.dto";
    
export class AuthService {
 private authRepository: AuthRepository;
 constructor(){
    this.authRepository= new AuthRepository()
 }
 async registerUser (data:registerDto):Promise<authEntity|null>{
    try {

        const hashedPassword = " emma"
        const findUser= await this.authRepository.findByEmail(data.email)
         if(findUser){
            throw new ConflictError(" email already exit")
         }
         const newUser= await this.authRepository.RegisterUser({
            email:data.password,
            password:hashedPassword
         })
          return newUser   
        
    } catch (error:any) {
        throw new  CrudError("error occured RegisterUser Functions")

        
    }


 }

 }
