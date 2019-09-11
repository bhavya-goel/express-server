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

    public async create(data, userid?) {
        const count = await this.checkUnique({ email: data.email});
        if (count) {
            throw new Error('email exists');
        }
        else {
          const result = await super.create(data, userid);
          return result.toObject({transform: (doc, ret) => {
            delete ret.password;
            delete ret.__v;
            return ret;
        }});
        }
    }

    public delete(query, userid) {
        return super.delete(query, userid);
    }

    public async update(query, options) {
        const result = await this.get(query);
        if (!result) {
            throw new Error('User not found');
        }
        const id = mongoose.Types.ObjectId();
        const oldId = result._id;
        const dataToUpdate = {
            ...options,
            updatedAt: Date.now(),
            updatedBy: options.userID,
        };
        const data = {
            ...result,
            _id: id,
            ...dataToUpdate,
        };
        // to check if email distinct or not
        const count = await (('email' in dataToUpdate) && (this.checkUnique(
          { email: dataToUpdate.email,
          originalID: {$ne: result.originalID },
          },
        )));
        if (count) {
            throw new Error('email exists');
        }
        return super.update({ _id: oldId}, data, options);
    }

    public count(query) {
        return super.count(query);
    }

    public checkUnique(query) {
        return super.checkUnique(query);
    }
}
