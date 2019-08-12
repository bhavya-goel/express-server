import * as mongoose from 'mongoose';
import { VersionableRepository } from '../versionable';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
export default class UserRepository extends VersionableRepository
<IUserModel, mongoose.Model<IUserModel>> {
    constructor() {
        super(userModel);
    }
    public get( query) {
        return super.get(query);
    }
    public create(data, userid) {
        return super.create(data, userid);
    }
    public delete(query, userid) {
        return super.delete(query, userid);
    }
    public update(query, dataToUpdate) {
        return super.update(query, dataToUpdate);
    }
}
