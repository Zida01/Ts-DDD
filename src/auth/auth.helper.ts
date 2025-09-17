// src/auth/auth.mapper.ts
import { authEntity } from "./auth.entity";
import { IUserDocument, UserModel } from "../shared/infrastruture/user.model";

// This type makes Mongoose docs strongly typed
// export type UserDoc = InstanceType<typeof UserModel>;

export const toAuthEntity = (user: IUserDocument): authEntity => {
  return {
    email: user.email,
    password: user.password,
    roles: user.roles,
  };
};