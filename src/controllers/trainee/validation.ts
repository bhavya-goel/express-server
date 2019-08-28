import { validateEmail } from '../../../extraTs/utils/helpers';

const validation = {
    create: {
        email: {
            custom: (email: string) => {
                if (!validateEmail(email)) {
                    throw new Error('Please enter email in format \
                    ( abc@successive.tech )special characters ( . -)allowed');
                }
            },
            errorMessage: 'Email is required',
            in: ['body'],
            required: true,
        },

        name: {
            errorMessage: 'Name is required',
            in: ['body'],
            regex: '',
            required: true,
        },

        password: {
            custom: (password: string) => {
                if (password === '') {
                    throw new Error('password cannot be empty');
                }
            },
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
                if (dataToUpdate.name) {
                    if (typeof(dataToUpdate.name) !== 'string') {
                        throw new Error('name must be string');
                    }
                    else {
                        const pattern = /^[a-zA-Z0-9]+$/;
                        if (! pattern.test(dataToUpdate.name)) {
                            throw new Error('enter a alphanumeric name');
                        }
                    }
                }
                if (dataToUpdate.password && dataToUpdate.password === '') {
                    throw new Error('password cannot be empty');
                }
                if (dataToUpdate.email && !validateEmail(dataToUpdate.email)) {
                    throw new Error('Please enter email in format ( \
                        abc@successive.tech )special characters ( . -)allowed');
                }
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
