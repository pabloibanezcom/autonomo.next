import { Types } from 'mongoose';
import { Gender } from '../enums/Gender';
import Address from './Address';
import File from './File';

export default interface Person {
  _id?: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  nif?: string;
  gender?: Gender;
  picture?: File;
  color?: string;
  address?: Address;
}
