import { IVersionableModel } from '../versionable';
export default interface IUserModel extends IVersionableModel {
    name: string;
    _id: string;
    email: string;
    password: string;
    role: string;
}
