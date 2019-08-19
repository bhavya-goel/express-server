import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import UserSchema from './UserSchema';
const userSchema = new UserSchema();
console.log('inside model');
export const userModel: mongoose.Model<IUserModel> =  mongoose.model<IUserModel>(
   'user',
   userSchema,
   'Users',
   true,
);
