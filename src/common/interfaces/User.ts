import { PopulatedDoc, Types } from 'mongoose';
import File from './File';
import Person from './Person';

export default interface User {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  image?: string;
  picture?: File;
  // defaultBusiness?: PopulatedDoc<Business>;
  // businesses?: UserBusiness[];
  defaultBusiness?: Types.ObjectId;
  businesses?: Types.ObjectId[];
  person: PopulatedDoc<Person>;
}
