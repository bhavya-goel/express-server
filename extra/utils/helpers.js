
export function validateEmail(email){
    // regrex function for email validation
    let pattern = /^[a-zA-Z0-9]+@successive\.tech$/
    return pattern.test(email)
}

