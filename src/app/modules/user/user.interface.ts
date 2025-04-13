export type TUser = {
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked?: boolean;
};
