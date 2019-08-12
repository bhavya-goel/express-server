import * as mongoose from 'mongoose';
export default interface IVersionableModel extends mongoose.Document {
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    deletedBy: string;
    deletedAt: Date;
    originalID: string;
}
