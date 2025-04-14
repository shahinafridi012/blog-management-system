import { Model } from "mongoose";

export interface TUser  {
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked?: boolean;
};
export interface UserModel extends Model<TUser>{
  isUserExistByCustomId(id: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
