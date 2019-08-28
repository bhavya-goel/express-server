import * as bcrypt from 'bcrypt';
import { configuration } from '../config';

import { userModel, UserRepository } from '../repositories';

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


    // one time seeding
    userModel.countDocuments({}, (err, count) => {
        if ( count === 0 && !err) {
            userRepository.create(user, 'admin');

        }
        else if (err) {
            console.log(err);
        }
    });
}
