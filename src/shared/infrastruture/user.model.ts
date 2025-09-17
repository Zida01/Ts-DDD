import { Schema, model, Document } from "mongoose";
import { Role } from "../../shared/role.enum";

export interface UserDocument extends Document {
  email: string;
  password: String;
  roles: Role[];
  status: String;
  createdAt: Date;
  isActive: boolean;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], enum: Role, default: [Role.USER] },
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
},
    { timestamps: true },

);
 export const UserModel =  model<UserDocument>("User", userSchema)

 