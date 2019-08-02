const validation = {
    create: {
        id:
        {
            in: ['body'],
            required: true,
            string: true,
            custom: (value) => {
                console.log('Value', value);
                throw {
                    error: 'Error Occured',
                    message: 'Message',
                };
            },
        },
        name: {
            regex: '',
            required: true,
            in: ['body'],
            errorMessage: 'Name is required',
        },
    },
    delete:
    {
        id: {
            errorMessage: 'Id is required',
            required: true,
            in: ['params'],
        },
    },
    get:
    {
        limit: {
            default: 10,
            required: false,
            number: true,
            in: ['query'],
            errorMessage: 'Limit is invalid',
        },
        skip: {
            default: 0,
            required: false,
            number: true,
            in: ['query'],
            errorMessage: 'Skip is invalid',
        },
    },
    update:
    {
        dataToUpdate: {
            in: ['body'],
            required: true,
            isObject: true,
            custom: (dataToUpdate) => {
                throw {
                    error: 'Error Occured',
                    message: 'Message',
                };
            },
        },
        id: {
            in: ['body'],
            required: true,
            string: true,
        },
    },
};
export default validation;
