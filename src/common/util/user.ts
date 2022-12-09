import { GrantType, LoginResponse, User } from '@autonomo/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../api/httpError/httpErrors';
import UserDB from '../../api/models/user';
import JWTUser from '../interfaces/JWTUser';

const validateGrantType = (required: GrantType, current: GrantType): boolean => {
  if (
    (required === GrantType.Admin && current !== GrantType.Admin) ||
    (required === GrantType.Write && current === GrantType.View)
  ) {
    throw new UnauthorizedError();
  }

  return true;
};

export const validateUserPassword = async (password: string, userPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, userPassword);
};

export const generateLoginResponse = (user: User): LoginResponse => {
  return {
    access_token: jwt.sign({ email: user.email, id: user._id }, process.env.JWT_TOKEN_SECRET as jwt.Secret),
    expires_in: 86400,
    token_type: 'Bearer'
  };
};

export const validateUser = async (
  authorizationHeader: string,
  businessId?: string,
  granType?: GrantType
): Promise<User> => {
  if (!authorizationHeader) {
    throw new UnauthorizedError();
  }
  const jwtUser = jwt.verify(
    authorizationHeader.replace('Bearer ', ''),
    process.env.JWT_TOKEN_SECRET as jwt.Secret
  ) as unknown as JWTUser;
  const user = await UserDB.findById(jwtUser.id).select('-password -businesses');
  if (!user) {
    throw new UnauthorizedError();
  }

  const getUserBusinessGrantType = (): GrantType => {
    return user.businesses?.find(b => b.business.toString() === businessId)?.grantType || GrantType.View;
  };

  if (granType) {
    validateGrantType(granType, user.isAdmin ? GrantType.Admin : getUserBusinessGrantType());
  }
  return user;
};
