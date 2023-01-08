import bcrypt from 'bcrypt';
import LoginData from '../../common/interfaces/auth/LoginData';
import User from '../../common/interfaces/User';
import { UnauthorizedError } from '../httpError/httpErrors';
import UserDB from '../models/user';

export const simpleLogin = async (loginData: LoginData): Promise<User> => {
  const user = await UserDB.findOne({ email: loginData.email.toLowerCase() });
  if (!user) {
    throw new UnauthorizedError();
  }
  const isValidPassword = await bcrypt.compare(loginData.password, user.password);
  if (!isValidPassword) {
    throw new UnauthorizedError();
  }

  return user;
};
