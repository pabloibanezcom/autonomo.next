import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import User from '../../common/interfaces/User';
import File from './file';
import { ModelName } from './modelName';

export const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address']
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
  picture: { type: File },
  defaultBusiness: { type: Schema.Types.ObjectId, ref: ModelName.Business },
  // businesses: { type: [UserBusiness] },
  businesses: { type: [Schema.Types.ObjectId] },
  person: { type: Schema.Types.ObjectId, ref: ModelName.Person, required: true }
});

export default (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>(ModelName.User, UserSchema);
