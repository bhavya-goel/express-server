import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
export default class VersionableRepository < D extends mongoose.Document, M extends mongoose.Model<D>> {
    private versionableModel: M;
    constructor(model) {
        this.versionableModel = model;
    }

    public create(option, userid): Promise<D> {
        const id = mongoose.Types.ObjectId();
        const data = {
            ...option,
            _id: id,
            createdAt: Date.now(),
            createdBy: userid,
            originalID: id,
        };
        return this.versionableModel.create(data).then((res) => {
            return res.toObject({transform: (doc, ret) => {
                delete ret.password;
                return ret;
            }});
        });
    }
    public createWithHash(options, userid): Promise<D> {
        const saltCount = 10;
        const salt = bcrypt.genSaltSync(saltCount);
        const password = options.password;
        const hash = bcrypt.hashSync(password, salt);
        const id = mongoose.Types.ObjectId();
        const data = {
            ...options,
            _id: id,
            createdAt: Date.now(),
            createdBy: userid,
            originalID: id,
            password: hash,
        };
        return this.versionableModel.create(data).then((res) => {
            return res.toObject({transform: (doc, ret) => {
                delete ret.password;
                return ret;
            }});
        });
    }
    public update(query, options): Promise<D> {
        return new Promise(async (resolve, reject) => {
            if (options.password) {
                const saltCount = 10;
            const salt = bcrypt.genSaltSync(saltCount);
            options.password = bcrypt.hashSync(options.password, salt);
            }
            const dataToUpdate = {
                ...options,
                updatedAt: Date.now(),
                updatedBy: options.userID,
            };
            const result = await this.get(query);
            if (result) {
                const id = mongoose.Types.ObjectId();
                const oldId = result._id;
                const data = {
                    ...result,
                    _id: id,
                    ...dataToUpdate,
                };
                await this.versionableModel.create(data);
                const final = this.versionableModel.updateOne({
                        _id: oldId,
                        }, {
                            deletedAt: Date.now(),
                            deletedBy: options.userID,
                        });
                if ( final ) {
                    resolve(final);
                }
                else {
                    reject(final);
                }
            }
            else {
                console.log('user not found');
                reject(result);
            }
        });
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
            return undefined;
        }
        return this.versionableModel.updateMany(options, dataToUpdate).then((res) => {
            return res;
        });
    }
}
