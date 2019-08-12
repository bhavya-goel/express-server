import * as mongoose from 'mongoose';
export default class VersionableRepository < D extends mongoose.Document, M extends mongoose.Model<D>> {
    private versionableModel: M;
    constructor(model) {
        this.versionableModel = model;
    }

    public create(options, userid): Promise<D> {
        const id = mongoose.Types.ObjectId();
        const data = {
            ...options,
            _id: id,
            createdAt: Date.now(),
            createdBy: userid.userID,
            originalID: id,
        };
        return this.versionableModel.create(data).then((res) => {
            return res.toObject();
        });
    }
    public update(query, options): Promise<D> {
        const dataToUpdate = {
            ...options,
            updatedAt: Date.now(),
            updatedBy: options.userID,
        };
        console.log('inside update');
        return this.versionableModel.updateMany(query, dataToUpdate).then((res) => {
            return res;
        });

    }
    public get( options): Promise<D> {
        const query = {
            ...options,
            deletedAt: { $exists: false },
            deletedBy: { $exists: false },
        };
        return this.versionableModel.find(query).lean().then((res) => {
            return res;
        });
    }
    public delete(options, userid): Promise<D> {
        const dataToUpdate = {
            deletedAt: Date.now(),
            deletedBy: userid.userID,
        };
        return this.versionableModel.updateMany(options, dataToUpdate).then((res) => {
            return res;
        });
    }
}
