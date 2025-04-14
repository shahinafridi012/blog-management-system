import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
  email: string;
  password: string;
  name: string,
  role: 'user' | 'admin';
  isBlocked?: boolean;
};
export interface UserModel extends Model<TUser>{
  isUserExistByCustomId(id: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;