import * as mongoose from 'mongoose';
import { VersionableRepository } from '../versionable';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';

export default class UserRepository extends VersionableRepository
<IUserModel, mongoose.Model<IUserModel>> {

    constructor() {
        super(userModel);
    }

    public getAll( query, projection?, options?) {
        return super.getAll(query, projection, options);
    }

    public get( query, projection?, options?) {
        return super.get(query, projection, options);
    }

    public async create(data, userid) {
        const count = await this.checkUnique({ email: data.email});
        if (count) {
            throw new Error('email exists1');
        }
        const result = await super.create(data, userid);
        return result.toObject({transform: (doc, ret) => {
            delete ret.password;
            return ret;
        }});
    }

    public delete(query, userid) {
        return super.delete(query, userid);
    }

    public update(query, dataToUpdate) {
        return super.update(query, dataToUpdate);
    }

    public count(query) {
        return super.count(query);
    }

    public checkUnique(query) {
        return super.checkUnique(query);
    }
}
