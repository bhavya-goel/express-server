import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import UserSchema from './UserSchema';

const userSchema = new UserSchema();

export const userModel: mongoose.Model<IUserModel> =  mongoose.model<IUserModel>(
   'user',
   userSchema,
   'Users',
   true,
);
