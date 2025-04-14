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

const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
  
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
  
    if (user.isBlocked)
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwt_access_secret as string,
      { expiresIn: '30d' }
    );
  
    return { token };
  };
export const AuthServices = {
  registerUser,
  loginUser,
};
