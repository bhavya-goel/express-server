import * as bcrypt from 'bcrypt';
import { configuration } from '../config';
import { userModel, UserRepository } from '../repositories';
const userRepository = new UserRepository();
export default function seedData() {
    const saltCount = 10;
    const salt = bcrypt.genSaltSync(saltCount);
    const { password } = configuration;
    const hash = bcrypt.hashSync(password, salt);
    const user = {
        email: 'trainee@gmail.com',
        name: 'trainee',
        password: hash,
        role: 'trainee',
    };
    userModel.countDocuments({
        deletedAt: { $exists: false },
        deletedBy: { $exists: false },
    }, (err, count) => {
        if ( count === 0 && !err) {
            userRepository.create(user, {
                userID: 'user',
            });
        }
        else if (err) {
            console.log(err);
        }
    });
}
