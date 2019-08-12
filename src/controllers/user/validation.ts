const validation = {
    create: {
        id:
        {
            custom: (value) => {
                console.log('Value', value);
                throw {
                    error: 'Error Occured',
                    message: 'Message',
                };
            },
            in: ['body'],
            required: true,
            string: true,
        },
        name: {
            errorMessage: 'Name is required',
            in: ['body'],
            regex: '',
            required: true,
        },
    },
    delete:
    {
        id: {
            errorMessage: 'Id is required',
            in: ['params'],
            required: true,
        },
    },
    get:
    {
        limit: {
            default: 10,
            errorMessage: 'Limit is invalid',
            in: ['query'],
            number: true,
            required: false,
        },
        skip: {
            default: 0,
            errorMessage: 'Skip is invalid',
            in: ['query'],
            number: true,
            required: false,
        },
    },
    update:
    {
        dataToUpdate: {
            custom: (dataToUpdate) => {
                // custom
            },
            in: ['body'],
            isObject: true,
            required: true,
        },
        id: {
            in: ['body'],
            required: true,
            string: true,
        },
    },
};
export default validation;
