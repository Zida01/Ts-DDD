import { Role } from "../shared/role.enum";

export interface authEntity {
  email: String;
  password: String; //hased password
  roles: Role[];
}
