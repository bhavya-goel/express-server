const validationHandler = (config) => (req, res, next) => {
    let key;
        for (key in config){
            for(let index in config[key]){
                let { in : place} = config[key]
                switch(index){
                    // checks if key present or not
                    case 'required':
                        // checks if key in request
                        if((key in req[place]) && req[place][key] != null){
                            break;
                        }
                        // if required is false and no value passed then set default value
                        else if(config[key][index] === false){
                            Object.defineProperty(req[place],key,{
                                value: config[key]['default']
                            })
                            break;
                        }
                        // if key not passed and no error message present
                        else if(config[key]['errorMessage'] === undefined){
                            next(`${key} required`)
                        }
                        // throw error if key not present
                        next(config[key]['errorMessage'])
                        break;
                    // checks if key is alphanumeric or not
                    case 'regex':
                        let pattern = /^[a-zA-Z0-9]+$/
                        if(pattern.test(req[place][key])){
                            break;
                        }
                        else{
                            next('enter a alphanumeric name')
                            break;
                        }
                    // checks if key is string or not    
                    case 'string':
                            if((typeof(req[place][key]) === 'string')){
                                break; 
                            }
                            next(`${key} not a string`)
                            break;
                    // checks if key is number or not
                    case 'number':
                            if(isNaN(Number(req[place][key]))){
                                next(`${key} not a number`)
                            }
                            break;
                    // checks if key object or not
                    case 'isObject':
                        if(typeof(req[place][key]) === 'object'){
                            break;
                        }
                        next(`${key} not an object`)
                        break;
                    case 'custom':
                        config[key].custom(req[place][key]);
                        break;
                }
            }
        }  
    next()
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