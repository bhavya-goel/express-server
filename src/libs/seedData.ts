import { UserRepository } from '../repositories';
const userRepository = new UserRepository();
export default function seedData() {
    console.log('inside seed function');
    const user = {
        email: 'user1@gmail.com',
        name: 'user1',
    };
    userRepository.create(user)
    .then((res) => {
        userRepository.update({ name: 'user1'}, {email: 'user'}); })
    .then((res) => {
        userRepository.get({
            name: 'user1',
        }, 'email', undefined);
    })
    .then((res) => {
        userRepository.delete({email: 'user'});
    })
    .then((res) => {
        userRepository.get({
            name: 'user1',
        }, 'email', undefined);
    });
}
