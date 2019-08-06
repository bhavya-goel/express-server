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
                            if(isNaN(Number(req.query[key]))){
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
