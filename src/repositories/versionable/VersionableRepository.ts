import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
export default class VersionableRepository
< D extends mongoose.Document, M extends mongoose.Model<D>> {

    private versionableModel: M;
    constructor(model) {
        this.versionableModel = model;
    }

    public async checkUnique(query) {
        const result = await this.count(query);
        return ( result > 0 );
    }

    public async create(option, userid?): Promise<D> {
        const id = mongoose.Types.ObjectId();
        const data = {
            ...option,
            _id: id,
            createdAt: Date.now(),
            createdBy: userid || id,
            originalID: id,
        };
        const result = await this.versionableModel.create(data);
        return result;
    }

    public async update(query, data, options): Promise<D> {
        await this.versionableModel.create(data);
        return await this.delete(query, options.userID);
    }

    public get( query, projection?, options?) {
        const queryNew = {
            ...query,
            deletedAt: { $exists: false },
            deletedBy: { $exists: false },
        };
        return this.versionableModel.findOne(queryNew, projection, options).lean();
    }

    public getAll( query, projection?, options?) {
        const queryNew = {
            ...query,
            deletedAt: { $exists: false },
            deletedBy: { $exists: false },
        };
        return this.versionableModel.find(queryNew, projection, options).lean();
    }

    public async delete(options, userid): Promise<D> {
        const dataToUpdate = {
            deletedAt: Date.now(),
            deletedBy: userid,
        };
        const user = await this.get(options).lean();
        if (!user) {
            throw new Error('User not found');
        }
        const result = await this.versionableModel.updateMany(options, dataToUpdate);
        return result;
    }

    public async count(query) {
        let value;
        await this.versionableModel.countDocuments({
            deletedAt: { $exists: false },
            deletedBy: { $exists: false },
            ...query,
        }, (err, count) => {
                value = count;
        });
        return value;
    }

}
