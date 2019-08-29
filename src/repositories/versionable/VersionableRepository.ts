import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
export default class VersionableRepository
< D extends mongoose.Document, M extends mongoose.Model<D>> {

    private versionableModel: M;
    constructor(model) {
        this.versionableModel = model;
    }

    public async checkUnique(email: string) {
        // to check that email field is unique
        const result = await this.getAll({email}, 'email');
        return ( result.length > 0 );
    }

    public async create(option, userid): Promise<D> {
        const id = mongoose.Types.ObjectId();
        const data = {
            ...option,
            _id: id,
            createdAt: Date.now(),
            createdBy: userid,
            originalID: id,
        };
        const count = await this.checkUnique(data.email);
        if (count) {
            throw new Error('email exists');
        }
        else {
            const result = await this.versionableModel.create(data);
            return result.toObject({transform: (doc, ret) => {
                delete ret.password;
                return ret;
            }});
        }
    }

    public async createWithHash(options, userid): Promise<D> {
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
        const count = await this.checkUnique(data.email);
        if (count) {
            throw new Error('email exists');
        }
        const result = await this.versionableModel.create(data);
        return result.toObject({transform: (doc, ret) => {
            delete ret.password;
            return ret;
        }});
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

                // to check if email distinct or not
                const count = await (('email' in dataToUpdate) && (this.checkUnique(data.email)));
                if (count) {
                    return reject('email exists');
                }

                // create an updated copy
                const create = await this.versionableModel.create(data);
                if (!create) {
                    return reject ('user update unsuccessful');
                }

                // delete previous copy
                const final = this.versionableModel.updateOne({
                        _id: oldId,
                        }, {
                            deletedAt: Date.now(),
                            deletedBy: options.userID,
                        });
                if ( final ) {
                    return resolve(final);
                }
                else {
                    return reject('user update unsuccessful');
                }
            }
            else {
                return reject('ID not found');
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
            throw new Error('ID incorrect');
        }
        const result = await this.versionableModel.updateMany(options, dataToUpdate);
        return result;
    }

    public async count() {
        let value;
        await this.versionableModel.countDocuments({
        deletedAt: { $exists: false },
        deletedBy: { $exists: false },
        role: 'trainee',
        }, (err, count) => {
            value = count;
        });
        return value;
    }

}
