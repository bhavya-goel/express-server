const validationHandler = (config) => (req, res, next) => {
    let keyValue;

    let error = [];
    Object.keys(config).forEach( (key) => {

        const {...index} = config[key];
        const { in : place} = index;

        if ('required' in index) {
            // checks if key in request
            if ((key in req[place]) && req[place][key] !== undefined) {
                keyValue = req[place][key];
            }
            // if required is false and no value passed then set default value
            else if (index.required === false) {
                Object.defineProperty(req[place], key, {
                    value: index.default,
                });
                keyValue = req[place][key];
            }
            // if key not passed and no error message present
            else if (index.errorMessage === undefined) {
                error.push(`${key} required`);
            }
            // throw error if key not present
            else {
                error.push(index.errorMessage);
            }
        }
    });
    if (error.length !== 0) {
        return next({
            error: 'Bad Request',
            message: error,
            status: 400,
        });
    }
    error = [];
    Object.keys(config).forEach( async (key) => {

        const {...index} = config[key];
        const { in : place} = index;
        keyValue = req[place][key];

        // checks if key is string or not
        if ('string' in index) {
            if (typeof(keyValue) !== 'string') {
                error.push(`${key} not a string`);
            }
            if (!keyValue) {
                error.push(`${key} cannot be empty`);
            }
        }

        // checks if key is alphanumeric or not
        if ('regex' in index) {
            const pattern = /^[a-zA-Z0-9]+$/;
            if (! pattern.test(keyValue)) {
                error.push('enter a alphanumeric name');
            }
        }

        // checks if key is number or not
        if ('number' in index) {
            if (isNaN(Number(keyValue))) {
                error.push(`${key} not a number`);
            }
        }

        // checks if key object or not
        if ('isObject' in index) {
            if (typeof(keyValue) !== 'object') {
                error.push(`${key} not an object`);
            }
        }

        // runs custom function at last
        if ('custom' in index) {
            try {
                index.custom(keyValue);
            }
            catch (err) {
                error.push(err.message);
            }
        }
    });
    if (error.length !== 0) {
        return next({
            error: 'Bad Request',
            message: error,
            status: 400,
        });
    }
    next();
};

export default validationHandler;
