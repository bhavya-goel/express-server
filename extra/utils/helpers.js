
export function validateEmail(email){
    let pattern = /^[a-zA-Z0-9]+@successive\.tech$/
    return pattern.test(email)
}

