import { config } from 'dotenv';
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
// let userModel: mongoose.Model<IUserModel>;
// if (process.env.NODE_ENV === 'test') {
//   console.log(process.env.NODE_ENV);
//   userModel =  mongoose.model<IUserModel>(
//     'user',
//     userSchema,
//     'Tests',
//     true,
//  );
// } else {
//   console.log(process.env.NODE_ENV);
//   userModel =  mongoose.model<IUserModel>(
//     'user',
//     userSchema,
//     'Users',
//     true,
//  );
// }
// export { userModel };
