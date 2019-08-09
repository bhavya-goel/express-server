import { userModel } from './UserModel';
export default class UserRepository {
    private userModel;
    constructor() {
        this.userModel = userModel;
    }
    public get( query) {
        return this.userModel.findOne(query).lean();
    }
    public create(data) {
        return this.userModel.create(data);
    }
    public delete(data) {
        return this.userModel.deleteMany(data);
    }
    public update(query, dataToUpdate) {
        return this.userModel.updateMany(query, dataToUpdate);
    }
}
