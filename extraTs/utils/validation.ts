import { IUsers } from '../interfaces';
import { validateEmail } from './helpers';
export default function validateUsers(users: IUsers[]): void {
    const validUser = users.filter( (value: IUsers): boolean => {
        return (validateEmail(value.traineeEmail) && validateEmail(value.reviewerEmail));
    });
    const inValidUser = users.filter( (value: IUsers): boolean => {
        return !(validateEmail(value.traineeEmail) && validateEmail(value.reviewerEmail));

    });
    console.log('Valid user count = ', validUser.length , '\n valid users are :' , validUser);
    console.log('-----------------------------------------------------------------------');
    console.log('Invalid user count = ', inValidUser.length , '\n valid users are :' , inValidUser);
}
