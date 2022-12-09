import { LoginData, LoginResponse, User } from '@autonomo/common';
import { generateLoginResponse, validateUser, validateUserPassword } from '../../common/util/user';
import { UnauthorizedError } from '../httpError/httpErrors';
import UserDB from '../models/user';

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  const user = await UserDB.findOne({ email: loginData.email.toLowerCase() });
  if (!user) {
    throw new UnauthorizedError();
  }
  const isValidPassword = await validateUserPassword(loginData.password, user.password);
  if (!isValidPassword) {
    throw new UnauthorizedError();
  }

  return generateLoginResponse(user);
};

export const getUser = async (authorizationHeader: string): Promise<User> => {
  return await validateUser(authorizationHeader);
};
