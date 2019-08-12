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
                required: true,
                type: String,
            },
            role: {
                required: true,
                type: String,
            },
        };
        super(userSchema, options);
    }
}
