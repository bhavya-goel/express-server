import { validateEmail } from '../../../extraTs/utils/helpers';

const validation = {
    create: {
        email: {
            custom: (email: string) => {
            if (!validateEmail(email)) {
                throw 'Please enter email in format ( abc@successive.tech )special characters ( . -)allowed';
            }
            },
            errorMessage: 'Email is required',
            in: ['body'],
            required: true,
        },

        password: {
            errorMessage: 'Password is required',
            in: ['body'],
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
