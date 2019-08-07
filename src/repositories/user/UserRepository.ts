import { userModel } from './UserModel';
export default class UserRepository {
    private userModel;
    constructor() {
        this.userModel = userModel;
    }
    public get( query, projection, options) {
        return this.userModel.find(query, projection, options).then((res) => {
            console.log('\n\ndata fetched>>>>>>>>>>>.', res);
        });
    }
    public create(data) {
        return this.userModel.create(data).then((res) => {
            console.log('\ndata added >>>>>>>>>.', res);
        });
    }
    public delete(data) {
        return this.userModel.deleteMany(data).then((res) => {
            console.log('\ndata deleted >>>>>>>>>.', res);
        });
    }
    public update(query, dataToUpdate) {
        return this.userModel.updateMany(query, dataToUpdate, (err, res) => {
            console.log('\ndata updated >>>>>>>>>.', res);
        });
    }
}
