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
                next({
                    error: 'Bad Request',
                    message: `${key} required`,
                    status: 400,
                });
            }
            // throw error if key not present
            else {
                next({
                    error: 'Bad Request',
                    message: index.errorMessage,
                    status: 400,
                });
            }
        }

        // checks if key is alphanumeric or not
        if ('regex' in index) {
            const pattern = /^[a-zA-Z0-9]+$/;
            if (! pattern.test(keyValue)) {
                next({
                    error: 'Bad Request',
                    message: 'enter a alphanumeric name',
                    status: 400,
                });
            }
        }

        // checks if key is string or not
        if ('string' in index) {
                if (typeof(keyValue) !== 'string') {
                    next({
                        error: 'Bad Request',
                        message: `${key} not a string`,
                        status: 400,
                    });
                }
        }

        // checks if key is number or not
        if ('number' in index) {
                if (isNaN(Number(keyValue))) {
                    next({
                        error: 'Bad Request',
                        message: `${key} not a number`,
                        status: 400,
                    });
                }
            }

        // checks if key object or not
        if ('isObject' in index) {
            if (typeof(keyValue) !== 'object') {
                next({
                    error: 'Bad Request',
                    message: `${key} not an object`,
                    status: 400,
                });
            }
        }

        // runs custom function at last
        if ('custom' in index) {
            try {
                index.custom(keyValue);
            }
            catch (err) {
                next({
                    error: 'Bad Request',
                    message: err,
                    status: 400,
                });
            }
        }
    });

    next();
};

export default validationHandler;

// Alternate way ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// const validationHandler = (config) => (req, res, next) => {
//     const method = req.method;
//     switch(method){
//         case 'GET':
//             let {skip, limit } = config;
//             if('skip' in req.query){}
//             else{
//                 Object.defineProperty(req.query, 'skip', {
//                     value: 0
//                 } );   
//             }
//             if(isNaN(Number(req.query.skip))){
//                 next('not a number');
//             }
//             if('limit' in req.query){}
//             else{
//                 Object.defineProperty(req.query, 'limit', {
//                     value: 10
//                 } );   
//             }
//             if(isNaN(Number(req.query.limit))){
//                 next('not a number');
//             }
//             break;
//         case 'POST':
//             let { id, name} = config;
//             if('id' in req.body){}
//             else{
//                 next('ID required')
//             }
//             if (typeof(req.body.id) === 'string'){}
//             else{
//                 next('ID not a string')
//             }
//             if('name' in req.body){}
//             else{
//                 next('Name is required')
//             }
//             let pattern = /^[a-zA-Z0-9]+$/
//             if(pattern.test(req.body.name)){}
//             else{
//                 next('enter a alphanumeric name')
//             }
//             break;
//         case 'PUT':
//             let { dataToUpdate, id: id2} = config;
//             if('id' in req.body){}
//             else{
//                 next('ID is required')
//             }
//             if(typeof(req.body.id) === 'string'){}
//             else{
//                 next('ID must be string')
//             }
//             if('dataToUpdate' in req.body){}
//             else{
//                 next('dataToUpdate is required')
//             }
//             if(typeof(req.body.dataToUpdate) === 'object'){}
//             else{
//                 next('dataToUpdate must be object')
//             }
//             dataToUpdate.custom(req.body.dataToUpdate);
//             break;
//         case 'DELETE':
//             if('id' in req.params){
//                 if(req.params.id == null){
//                     next('ID required')
//                 }
//             }
//             else{
//                 next('ID is required')
//             }
//             break;
//     }
//     next();
// }
// export default validationHandler;
