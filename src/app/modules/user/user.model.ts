/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});
//hash password before saving 
userSchema.pre('save', async function(next){
  const user = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  }
  next()
})
// Hide password after saving
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
// Static methods
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const User = model<TUser>('User', userSchema);
