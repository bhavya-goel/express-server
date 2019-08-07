import * as mongoose from 'mongoose';
export default class UserSchema extends mongoose.Schema {
    public userSchema;
    constructor(options?) {
        console.log('inside schema');
        const userSchema = {
            email: {
                required: true,
                type: String,
            },
                name: {
                    required: true,
                    type: String,
                },
        };
        super(userSchema, options);
    }
}
