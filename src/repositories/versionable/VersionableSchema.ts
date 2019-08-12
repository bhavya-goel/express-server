import * as mongoose from 'mongoose';
export default class VersionableSchema extends mongoose.Schema {
    public versionSchema;
    constructor(options, collection?) {
        const versionSchema = {
            ...options,
            createdAt: {
                required: false,
                type: Date,
            },
            createdBy: {
                required: false,
                type: String,
            },
            deletedAt: {
                required: false,
                type: Date,
            },
            deletedBy: {
                required: false,
                type: String,
            },
            originalID : {
                required: false,
                type: String,
            },
            updatedAt: {
                required: false,
                type: Date,
            },
            updatedBy: {
                required: false,
                type: String,
            },
        };
        super(versionSchema, collection);
    }
}
