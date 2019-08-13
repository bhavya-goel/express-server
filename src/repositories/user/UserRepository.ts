import * as mongoose from 'mongoose';
import { VersionableRepository } from '../versionable';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
export default class UserRepository extends VersionableRepository
<IUserModel, mongoose.Model<IUserModel>> {
    constructor() {
        super(userModel);
    }
    public getAll( query, options?) {
        return super.getAll(query, options);
    }
    public get( query, options?) {
        return super.get(query, options);
    }
    public create(data, userid) {
        return super.create(data, userid);
    }
    public createWithHash(data, userid) {
        return super.createWithHash(data, userid);
    }
    public delete(query, userid) {
        return super.delete(query, userid);
    }
    public update(query, dataToUpdate) {
        return super.update(query, dataToUpdate);
    }
}
