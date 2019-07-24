const users = 
[
    {traineeEmail:"trainee1@successive.tech",reviewerEmail:"reviewer1@successive.tech"},
    {traineeEmail:"traINee2@successive.tech",reviewerEmail:"revi2ewer@successive.tech"},
    {traineeEmail:"train-ee@successive.tech",reviewerEmail:"reviewer@successive.tech"},
    {traineeEmail:"trai.nee9@successive.tech",reviewerEmail:"reviewer.tr@successive.tech"},
    {traineeEmail:"trainee_6@successive.tech",reviewerEmail:"reviewer_6@successive.tech"},
    {traineeEmail:"trainee7@successive.tech",reviewerEmail:"reviewer7@successive.tech"}
]

function validateEmail(email){
    let pattern = /^[a-zA-Z0-9]+@successive\.tech$/
    return pattern.test(email)
}

function validateUsers(users){
    const validUser = users.filter( (value)=> {
        return (validateEmail(value.traineeEmail) && validateEmail(value.reviewerEmail))

    });
    const inValidUser = users.filter( (value)=> {
        return !(validateEmail(value.traineeEmail) && validateEmail(value.reviewerEmail))

    });
    console.log("Valid user count = ", validUser.length , "\n valid users are :" ,validUser)
    console.log("-----------------------------------------------------------------------")
    console.log("Invalid user count = ", inValidUser.length , "\n valid users are :" ,inValidUser)
}
validateUsers(users);
