import * as mongoose from 'mongoose';
export default interface IUserModel extends mongoose.Document {
    name: string;
    id: number;
    email: string;
}
