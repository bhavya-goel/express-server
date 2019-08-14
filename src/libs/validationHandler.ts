const validationHandler = (config) => (req, res, next) => {
    let keyValue;
    Object.keys(config).forEach( (key) => {
        const {...index} = config[key];
        const { in : place} = index;
        // checks if key present or not
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
                next(`${key} required`);
            }
            // throw error if key not present
            else {
                next(index.errorMessage);
            }
        }
        // checks if key is alphanumeric or not
        if ('regex' in index) {
            const pattern = /^[a-zA-Z0-9]+$/;
            if (! pattern.test(keyValue)) {
                next('enter a alphanumeric name');
            }
        }
        // checks if key is string or not
        if ('string' in index) {
                if (typeof(keyValue) !== 'string') {
                    next(`${key} not a string`);
                }
        }
        // checks if key is number or not
        if ('number' in index) {
                if (isNaN(Number(keyValue))) {
                    next(`${key} not a number`);
                }
            }
        // checks if key object or not
        if ('isObject' in index) {
            if (typeof(keyValue) !== 'object') {
                next(`${key} not an object`);
            }
        }
        if ('custom' in index) {
            try {
                index.custom(keyValue);
            }
            catch (error) {
                next(error);
            }
        }
    });
    next();
};
export default validationHandler;
