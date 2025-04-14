import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import config from '../../config';
import { TUser } from '../user/user.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
const registerUser = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.FORBIDDEN, 'User already exists');
  }
  const user = await User.create(payload);
  return user;
};

const loginUser = async (payload: TUser) => {
    const { email, password} = payload
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
  
    const isPasswordMatch =  bcrypt.compare(password, user.password); 
    console.log(isPasswordMatch)
    if (!isPasswordMatch)
      throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
    
    if (user.isBlocked)
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  
    const token = jwt.sign(
       { id: user._id, email: user.email, role: user.role },
      config.jwt_access_secret as string,
      { expiresIn: '30d' }
    );
  
    return { token };
  };
export const AuthServices = {
  registerUser,
  loginUser,
};
