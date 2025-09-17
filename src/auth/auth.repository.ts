import { UserModel } from "../shared/infrastruture/user.model";
import { authEntity } from "./auth.entity";
import { registerDto } from "./dto/auth.dto";
import { ResponseUtils, IResponse } from "../shared/response.utill";

export class AuthRepository {
  async createUser(data: registerDto): Promise<authEntity> {
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
      return {
        email: newUser.email,
        password: newUser.password,
        roles: newUser.roles 
      };
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
  }
}
