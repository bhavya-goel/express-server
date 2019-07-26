import { Iusers } from '../interfaces';
import { validateEmail } from './helpers';
export default function validateUsers(users: Iusers[]): void {
    const validUser = users.filter( (value: Iusers): boolean => {
        return (validateEmail(value.traineeEmail) && validateEmail(value.reviewerEmail));
    });
    const inValidUser = users.filter( (value: Iusers): boolean => {
        return !(validateEmail(value.traineeEmail) && validateEmail(value.reviewerEmail));

    });
    console.log('Valid user count = ', validUser.length , '\n valid users are :' , validUser);
    console.log('-----------------------------------------------------------------------');
    console.log('Invalid user count = ', inValidUser.length , '\n valid users are :' , inValidUser);
}
