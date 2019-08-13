import { VersionableSchema } from '../versionable';
export default class UserSchema extends VersionableSchema {
    public userSchema;
    constructor(options?) {
        console.log('inside schema');
        const userSchema = {
            _id: {
                type: String,
            },
            email: {
                required: true,
                type: String,
            },
            name: {
                required: true,
                type: String,
            },
            password: {
                required: false,
                type: String,
            },
            role: {
                default: 'trainee',
                required: false,
                type: String,
            },
        };
        super(userSchema, options);
    }
}
