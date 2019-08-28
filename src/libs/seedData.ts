import * as bcrypt from 'bcrypt';
import { configuration } from '../config';
import { UserRepository } from '../repositories';
import { userModel } from '../repositories/user/UserModel';
const userRepository = new UserRepository();

export default function seedData() {
    // to create hash for password

    const saltCount = 10;
    const salt = bcrypt.genSaltSync(saltCount);
    const { password } = configuration;
    const hash = bcrypt.hashSync(password, salt);

    const user = {
        email: 'head.trainer@successive.tech',
        name: 'headTrainer',
        password: hash,
        role: 'head-trainer',
    };
    userModel.countDocuments({
        deletedAt: { $exists: false },
        deletedBy: { $exists: false },
        }, (err, count) => {
        if ( count === 0 && !err) {
            userRepository.create(user, 'admin');
        }
        else if (err) {
            console.log(err);
        }
    });
    // .then((res) => {
    //     userRepository.update({ name: 'user1'}, {email: 'user'}); })
    // .then((res) => {
    //     userRepository.get({
    //         name: 'user1',
    //     }, 'email', undefined);
    // })
    // .then((res) => {
    //     userRepository.delete({email: 'user'});
    // })
    // .then((res) => {
    //     userRepository.get({
    //         name: 'user1',
    //     }, 'email', undefined);
    // });
}
