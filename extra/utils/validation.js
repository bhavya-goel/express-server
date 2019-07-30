import { validateEmail } from "./helpers.js"


export default function validateUsers(users){
    const validUser = users.filter( (value)=> {
        // returns valid users in a new array
        return (validateEmail(value.traineeEmail) && validateEmail(value.reviewerEmail))

    });
    const inValidUser = users.filter( (value)=> {
        // returns invalid users in a new array
        return !(validateEmail(value.traineeEmail) && validateEmail(value.reviewerEmail))

    });
    console.log("Valid user count = ", validUser.length , "\n valid users are :" ,validUser)
    console.log("-----------------------------------------------------------------------")
    console.log("Invalid user count = ", inValidUser.length , "\n valid users are :" ,inValidUser)
}


