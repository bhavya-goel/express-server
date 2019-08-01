const validationHandler = (config) => (req, res, next) => {
    console.log(req.params.id)
        for(let key in config){
            let flag = 0;
            for(let index in config[key]){
                let { in : place} = config[key]
                switch(index){
                    case 'required':
                    if((key in req[place]) && req[place][key] != null){
                        break;
                    }
                    else if(config[key][index] === false){
                        flag =1;
                        break;
                    }
                    else if((config[key]['errorMessage'] === undefined) && 'custom' in config[key]){
                        config[key].custom(req[place][key]);
                        break;
                    }
                    next(config[key]['errorMessage'])
                    break;
                    case 'regex':
                        let pattern = /^[a-zA-Z0-9]+$/
                        if(pattern.test(req[place][key]) && (flag != 1)){
                            break;
                        }
                        else{
                            next('enter a alphanumeric name')
                            break;
                        }
                    case 'string':
                            if((typeof(req[place][key]) === 'string') && (flag != 1)){
                                break; 
                            }
                            next('not a string')
                            break;
                    case 'number':
                            if(isNaN(Number(req.query[key])) && flag != 1){
                                next('not a number')
                            }
                            break;
                    case 'isObject':
                        if(typeof(req[place][key])=== 'object'){
                            break;
                        }
                        config[key].custom(req[place][key]);
                        break;
                    
                }
            }
        }  
    next()
};

export default validationHandler;
