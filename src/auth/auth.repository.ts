import { UserModel } from "../shared/infrastruture/user.model";
import { authEntity } from "./auth.entity";
import { registerDto } from "./dto/auth.dto";
import { ResponseUtils, IResponse } from "../shared/response.utill";

export class AuthRepository {
  async RegisterUser(data: registerDto): Promise<authEntity | null> {
    try {
      const existingUser = await UserModel.findOne({ email: data.email });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
      const newUser = new UserModel({
        email: data.email,
        password: data.password,
        roles: ["USER"],
      });
      await newUser.save();
      // this return a mongoose object not authEntity Object in the typescript
      return newUser

    } catch (error : any) {
        throw new Error(`Error creating user1: ${error.message}`);
    }
  }

   async findByEmail(email: string): Promise<authEntity | null> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return null;
 // this return a mongoose object not authEntity Object in the typescript
      return  user
    } catch (error: any) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  /**
   * Change password for a user
   */
  async changePassword(userId: string, newPassword: string): Promise<void> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      user.password = newPassword; // ⚠️ hash this in service before calling repo
      await user.save();
    } catch (error: any) {
      throw new Error(`Error changing password: ${error.message}`);
    }
  }
  async findAll ():Promise<authEntity[]>{
    try {
       const allUser=  await UserModel.find()
        // this return a mongoose object not authEntity Object in the typescript
       return allUser
      
    } catch (error:any) {
      throw new Error(`Error finding all  User: ${error.message}`);
      
    }
  }

}
